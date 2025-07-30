"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to be able to edit reservations");

  const newBooking = {
    ...bookingData,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice + 0,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    guestId: session.user.guestId,
    observations: formData.get("observations").slice(0, 1000),
    numGuests: Number(formData.get("numGuests")),
  };
  console.log(newBooking);
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  const updatedData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to be able to edit reservations");

  const bookings = await getBookings(session.user.guestId);
  const bookingsIds = bookings.map((booking) => booking.id);
  if (!bookingsIds.includes(bookingId))
    throw new Error("You can not edit this reservation.");

  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId)
    .select();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`account/reservations/edit/${bookingId}`);
  revalidatePath("account/reservations");

  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session)
    throw new Error("You need to be logged in to perform this action.");

  // first check if the user is allowed to delete the reservation
  const guestBookings = await getBookings(session.user.guestId);

  const bookingIds = guestBookings.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this reservation.");
  }
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) {
    throw new Error("Reservation could not be deleted");
  }

  // refetch data on the client side
  revalidatePath("account/reservations");
}

export async function updateGuest(formData) {
  // Check for authorized user by checking if there is an existing session
  const session = await auth();
  if (!session)
    throw new Error("You need to be logged in to perform this action.");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // Check for valid national ID
  const regex = /^[a-zA-z0-9]{6,12}$/;

  if (!regex.test(nationalID)) {
    throw new Error("You should provide a valid national id.");
  }
  const updatedData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}
