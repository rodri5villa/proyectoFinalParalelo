using BackFinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackFinalProject.Repositories.IRepositories
{
    public interface IPlayerRepository
    {
        Task<IEnumerable<Player>> GetAllPlayers();
        Task<Player> GetPlayerById(int id);
        Task<IEnumerable<Player>> GetPlayersByTeamId(int teamId);
        Task<Player> AddPlayer(Player player);
        Task<Player> UpdatePlayer(Player player);
        Task<bool> DeletePlayer(int id);
    }
}
