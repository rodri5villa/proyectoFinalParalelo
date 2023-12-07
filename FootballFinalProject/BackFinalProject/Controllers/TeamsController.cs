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
    public class TeamsController : ApiController
    {
        private readonly ITeamRepository teamRepository;

        public TeamsController()
        {
            teamRepository = new TeamRepositoryImpl();
        }

        // GET: api/Teams
        [HttpGet]
        public async Task<IHttpActionResult> GetAllTeams()
        {
            IEnumerable<Team> teams = await teamRepository.GetAllTeams();
            return Ok(teams);
        }

        // GET: api/Teams/5
        [HttpGet]
        public async Task<IHttpActionResult> GetTeamById(int id)
        {
            Team team = await teamRepository.GetTeamById(id);

            if (team == null)
            {
                return NotFound();
            }

            return Ok(team);
        }

        [HttpGet]
        [Route("api/Teams/League/{id}")]
        public async Task<IHttpActionResult> GetTeamsByLeagueId(int id)
        {
            IEnumerable<Team> teams = await teamRepository.GetTeamsByLeagueId(id);

            if (teams == null)
            {
                return NotFound();
            }

            return Ok(teams);
        }

        // POST: api/Teams
        [HttpPost]
        public async Task<IHttpActionResult> AddTeam([FromBody] Team team)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Team insertedTeam = await teamRepository.AddTeam(team);

            if (insertedTeam == null)
            {
                return BadRequest("Error inserting team");
            }
            return Ok(insertedTeam);
        }

        // PUT: api/Teams/5
        [HttpPut]
        public async Task<IHttpActionResult> UpdateTeam(int id, [FromBody] Team team)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (team == null)
            {
                return BadRequest("Team is null");
            }

<<<<<<< HEAD
            //if (id != team.id)
            //{
            //    return BadRequest();
            //}

=======
>>>>>>> 76756339483930fa68e24c62d15ac2900d8f0e05
            Team updatedTeam = await teamRepository.UpdateTeam(team);

            if (updatedTeam == null)
            {
                return BadRequest("Error updating team");
            }

            return Ok(updatedTeam);
        }

        // DELETE: api/Teams/5
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteTeam(int id)
        {
            bool result = await teamRepository.DeleteTeam(id);

            if (!result)
            {
                return BadRequest("Error deleting team");
            }

            return Ok();
        }
    }
}
