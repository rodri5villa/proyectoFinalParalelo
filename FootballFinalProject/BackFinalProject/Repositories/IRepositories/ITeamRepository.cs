using BackFinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackFinalProject.Repositories.IRepositories
{
    public interface ITeamRepository
    {
        Task<IEnumerable<Team>> GetAllTeams();
        Task<Team> GetTeamById(int id);
        Task<IEnumerable<Team>> GetTeamsByLeagueId(int id);
        Task<Team> AddTeam(Team team);
        Task<Team> UpdateTeam(Team team);
        Task<bool> DeleteTeam(int id);
    }
}
