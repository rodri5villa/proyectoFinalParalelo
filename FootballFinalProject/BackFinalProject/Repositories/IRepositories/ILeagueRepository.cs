using BackFinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackFinalProject.Repositories.IRepositories
{
    public interface ILeagueRepository
    {
        Task<IEnumerable<League>> GetAllLeagues();
        Task<League> GetLeagueById(int id);
        Task<League> AddLeague(League league);
        Task<League> UpdateLeague(League league);
        Task<bool> DeleteLeague(int id);
    }
}
