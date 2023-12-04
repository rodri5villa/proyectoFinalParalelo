using BackFinalProject.Models;
using BackFinalProject.Repositories.IRepositories;
using BackFinalProject.Repositories.RepositoriesImpl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace BackFinalProject.Controllers
{
    public class PlayersController : ApiController
    {

        private IPlayerRepository playerRepository;

        public PlayersController()
        {
             playerRepository = new PlayerRepositoryImpl();
        }

        // GET: api/Players
        [HttpGet]
        public async Task<IHttpActionResult> GetAllPlayers()
        {
            IEnumerable<Player> players = await playerRepository.GetAllPlayers();
            return Ok(players);
        }

        // GET: api/Players/5
        [HttpGet]
        public async Task<IHttpActionResult> GetPlayerById(int id)
        {
            Player player = await playerRepository.GetPlayerById(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        // GET: api/Players/Teams/5
        [HttpGet]
        [Route("api/Players/Team/{id}")]
        public async Task<IHttpActionResult> GetPlayersByTeamId(int id)
        {
            IEnumerable<Player> players = await playerRepository.GetPlayersByTeamId(id);

            if (players == null)
            {
                return NotFound();
            }

            return Ok(players);
        }

        // POST: api/Players
        [HttpPost]
        public async Task<IHttpActionResult> AddPlayer([FromBody]Player player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Player insertedPlayer = await playerRepository.AddPlayer(player);

            if (insertedPlayer == null)
            {
                return BadRequest("Error inserting player");
            }

            return Ok(insertedPlayer);
        }

        // PUT: api/Players/5
        [HttpPut]
        public async Task<IHttpActionResult> UpdatePlayer(int id, [FromBody]Player player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (player == null)
            {
                return BadRequest("Player is null");
            }

            if (id != player.id)
            {
                return BadRequest();
            }

            Player updatedPlayer = await playerRepository.UpdatePlayer(player);

            if (updatedPlayer == null)
            {
                return BadRequest("Error updating player");
            }

            return Ok(updatedPlayer);
        }

        // DELETE: api/Players/5
        [HttpDelete]
        public async Task<IHttpActionResult> DeletePlayer(int id)
        {
            bool result = await playerRepository.DeletePlayer(id);

            if (!result)
            {
                return BadRequest("Error deleting player");
            }

            return Ok();
        }
    }
}
