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
    public class LeaguesController : ApiController
    {
        private readonly ILeagueRepository leagueRepository;
        
        public LeaguesController()
        {
            leagueRepository = new LeagueRepositoryImpl();
        }

        // GET: api/Leagues
        [HttpGet]
        public async Task<IHttpActionResult> GetAllLeagues()
        {
            IEnumerable<League> leagues = await leagueRepository.GetAllLeagues();

            return Ok(leagues);
        }

        // GET: api/Leagues/5
        [HttpGet]
        public async Task<IHttpActionResult> GetLeagueById(int id)
        {
            League league = await leagueRepository.GetLeagueById(id);

            if (league == null)
            {
                return NotFound();
            }

            return Ok(league);
        }

        // POST: api/Leagues
        [HttpPost]
        public async Task<IHttpActionResult> AddLeague([FromBody]League league)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            League insertedLeague = await leagueRepository.AddLeague(league);

            if (insertedLeague == null)
            {
                return BadRequest("Error inserting league");
            }

            return Ok(insertedLeague);
        }

        // PUT: api/Leagues/5
        [HttpPut]
        public async Task<IHttpActionResult> UpdateLeague(int id, [FromBody]League league)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (league == null)
            {
                return BadRequest("League is null");
            }

            if (id != league.id)
            {
                return BadRequest();
            }

            League updatedLeague = await leagueRepository.UpdateLeague(league);

            if (updatedLeague == null)
            {
                return BadRequest("Error updating league");
            }

            return Ok(updatedLeague);
        }

        // DELETE: api/Leagues/5
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteLeague(int id)
        {
            bool deleted = await leagueRepository.DeleteLeague(id);

            if (!deleted)
            {
                return BadRequest("Error deleting league");
            }

            return Ok();
        }
    }
}
