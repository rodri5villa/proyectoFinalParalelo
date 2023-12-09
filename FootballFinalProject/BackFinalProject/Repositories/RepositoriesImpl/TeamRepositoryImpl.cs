using BackFinalProject.Models;
using BackFinalProject.Repositories.IRepositories;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace BackFinalProject.Repositories.RepositoriesImpl
{
    public class TeamRepositoryImpl : ITeamRepository
    {
        private string connectionString = "server=localhost;port=3306;database=leagues_football;user=root;password=;";

        public async Task<Team> AddTeam(Team team)
        {
            Team insertedTeam = null;

            using(MySqlConnection connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();

                MySqlCommand command = new MySqlCommand("INSERT INTO teams (name, city, leagueId, image) VALUES (@name, @city, @leagueId, @image); SELECT LAST_INSERT_ID();", connection);
                command.Parameters.AddWithValue("@name", team.name);
                command.Parameters.AddWithValue("@city", team.city);
                command.Parameters.AddWithValue("@leagueId", team.leagueId);
                command.Parameters.AddWithValue("@image", team.image);

                object result = await command.ExecuteScalarAsync();
                long insertedId = (result != null && result != DBNull.Value) ? Convert.ToInt64(result) : -1;

                if (insertedId != -1)
                {
                    command = new MySqlCommand("SELECT * FROM teams WHERE id = @id", connection);
                    command.Parameters.AddWithValue("@id", insertedId);

                    using (MySqlDataReader reader = (MySqlDataReader)await command.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            insertedTeam = new Team
                            {
                                id = Convert.ToInt32(reader["id"]),
                                name = reader["name"].ToString(),
                                city = reader["city"].ToString(),
                                leagueId = Convert.ToInt32(reader["leagueId"]),
                                image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                            };
                        }
                        reader.Close();
                    }
                }
                connection.Close();
            }
            return insertedTeam;
        }

        public Task<IEnumerable<Team>> GetAllTeams()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("SELECT * FROM teams", connection);

                using (MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                {
                    List<Team> teams = new List<Team>();

                    while (reader.Read())
                    {
                        teams.Add(new Team
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            city = reader["city"].ToString(),
                            leagueId = Convert.ToInt32(reader["leagueId"]),
                            image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                        });
                    }

                    reader.Close();
                    connection.Close();

                    return Task.FromResult<IEnumerable<Team>>(teams);
                }
            }
        }

        public Task<Team> GetTeamById(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("SELECT * FROM teams WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", id);

                using (MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                {
                    Team team = null;

                    if (reader.Read())
                    {
                        team = new Team
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            city = reader["city"].ToString(),
                            leagueId = Convert.ToInt32(reader["leagueId"]),
                            image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                        };
                    }
                    reader.Close();
                    connection.Close();

                    return Task.FromResult<Team>(team);
                }
            }
        }

        public Task<IEnumerable<Team>> GetTeamsByLeagueId(int leagueId)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("SELECT * FROM teams WHERE leagueId = @leagueId", connection);
                command.Parameters.AddWithValue("@leagueId", leagueId);

                using (MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                {
                    List<Team> teams = new List<Team>();

                    while (reader.Read())
                    {
                        teams.Add(new Team
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            city = reader["city"].ToString(),
                            leagueId = Convert.ToInt32(reader["leagueId"]),
                            image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                        });
                    }

                    reader.Close();
                    connection.Close();

                    return Task.FromResult<IEnumerable<Team>>(teams);
                }
            }
        }

        public Task<Team> UpdateTeam(Team team)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("UPDATE teams SET name = @name, city = @city, leagueId = @leagueId, image = @image WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", team.id);
                command.Parameters.AddWithValue("@name", team.name);
                command.Parameters.AddWithValue("@city", team.city);
                command.Parameters.AddWithValue("@leagueId", team.leagueId);
                command.Parameters.AddWithValue("@image", team.image);

                command.ExecuteNonQuery();

                command = new MySqlCommand("SELECT * FROM teams WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", team.id);

                using (MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                {
                    Team updatedTeam = null;

                    if (reader.Read())
                    {
                        updatedTeam = new Team
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            city = reader["city"].ToString(),
                            leagueId = Convert.ToInt32(reader["leagueId"]),
                            image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                        };
                    }
                    reader.Close();
                    connection.Close();

                    return Task.FromResult<Team>(updatedTeam);
                }
            }
        }

        public Task<bool> DeleteTeam(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("DELETE FROM teams WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", id);

                int affectedRows = command.ExecuteNonQuery();

                connection.Close();

                return Task.FromResult(affectedRows > 0);
            }
        }
    }
}