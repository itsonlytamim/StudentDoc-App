using GTR_Task.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentDocHub_App.Controllers.ViewModels;
using StudentDocHub_App.Services;

namespace StudentDocHub_App.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtTokenService _jwtTokenService;
        private readonly UserService _userService;

        public AuthController(JwtTokenService jwtTokenService, UserService userService)
        {
            _jwtTokenService = jwtTokenService;
            _userService = userService;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestModel loginRequest)
        {
            if (_userService.IsUserValid(loginRequest.Username, loginRequest.Password))
            {
                // Get the studentId from your data store or user service
                int studentId = _userService.GetStudentIdByUsername(loginRequest.Username);

                // Generate a JWT token with studentId
                var token = _jwtTokenService.GenerateJwtToken(loginRequest.Username);

                return Ok(new {studentId});
            }

            return BadRequest(new { Message = "Invalid username or password" });
        }


    }
}
