using Cinema.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Mappers
{
    public static class ReservationMapperHelpers
    {
    public static double CalculateReservationValue(Reservation reservation)
    {
      if (reservation?.Seance == null)
        throw new ArgumentNullException();
      double concessionaryTicketsCost = reservation.NumberOfConcessionaryTickets * reservation.Seance.ConcessionaryTicketPrice;
      double normalTicketsCost = reservation.NumberOfNormalTickets * reservation.Seance.NormalTicketPrice;
      double sum = concessionaryTicketsCost + normalTicketsCost;
      return sum;
    }
  }
}
