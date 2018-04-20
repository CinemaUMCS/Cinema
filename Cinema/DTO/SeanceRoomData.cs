using System;
using System.Collections.Generic;
using Cinema.Entities;

namespace Cinema.DTO
{
  public class SeanceRoomData
  {
    public int RoomId { get; set; }
    public int SeanceId { get; set; }
    public ICollection<Seat> AvailableSeats { get; set; }
    public ICollection<Seat> ReservedSeats { get; set; }

    public SeanceRoomData()
    {
      AvailableSeats =new List<Seat>();
      ReservedSeats = new List<Seat>();
    }
  }
}
