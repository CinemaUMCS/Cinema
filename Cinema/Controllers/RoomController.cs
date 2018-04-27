using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Data;
using Cinema.DTO;
using Cinema.Request;
using Cinema.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Controllers
{
  public class RoomController : BaseController
  {
    private readonly IRoomService _roomService;

    public RoomController(IRoomService roomService)
    {
      _roomService = roomService;
    }

    [HttpPost]
    //[Authorize(Roles = "admin")]
    public async Task<IActionResult> AddRoom([FromBody] AddRoom addRoom)
    {
      await _roomService.AddRoom(addRoom.Name, addRoom.NumberOfRows, addRoom.NumberOfSeatsInRow);
      return Ok();
    }

    [HttpGet("availableRooms")]
    public async Task<IActionResult> BrowseRoomsAvailableOnDateTime(DateTime seanceStart, DateTime seanceEnd)
    {
      var rooms = await _roomService.GetAvailableRoomsOnTimeAsync(seanceStart, seanceEnd);
      return Json(rooms);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var rooms = await _roomService.GetAllAsync();
      return Json(rooms);
    }
  };
}
