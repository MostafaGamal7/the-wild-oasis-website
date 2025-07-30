import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = await params;
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabinId),
  ]);
  return Response.json({
    settings,
    bookedDates,
  });
}
