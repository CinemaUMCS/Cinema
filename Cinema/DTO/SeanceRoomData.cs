using System;
using System.Collections.Generic;
using Cinema.Entities;

namespace Cinema.DTO
{
  public class SeanceRoomData
  {
    public int RoomId { get; set; }
    public int SeanceId { get; set; }
    public ICollection<SeatDto> SeatsInRoom { get; set; }
    public ICollection<SeatDto> ReservedSeats { get; set; }

    public SeanceRoomData()
    {
      SeatsInRoom =new List<SeatDto>();
      ReservedSeats = new List<SeatDto>();
    }
  }
}
