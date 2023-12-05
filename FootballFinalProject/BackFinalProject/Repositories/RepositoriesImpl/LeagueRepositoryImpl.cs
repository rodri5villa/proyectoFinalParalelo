using BackFinalProject.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackFinalProject.Repositories.RepositoriesImpl
{
    internal class LeagueRepositoryImpl : IRepositories.ILeagueRepository
    {

        private string connectionString= "server=localhost;port=3306;database=leagues_football;user=root;password=;";


        public async Task<League> AddLeague(League league)
        {
            League insertedLeague = null;

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();

                MySqlCommand command = new MySqlCommand("INSERT INTO leagues (name, country, image) VALUES (@name, @country, @image); SELECT LAST_INSERT_ID();", connection);
                command.Parameters.AddWithValue("@name", league.name);
                command.Parameters.AddWithValue("@country", league.country);
                command.Parameters.AddWithValue("@image", league.image);

                object result = await command.ExecuteScalarAsync();
                long insertedId = (result != null && result != DBNull.Value) ? Convert.ToInt64(result) : -1;

                if (insertedId != -1)
                {
                    command = new MySqlCommand("SELECT * FROM leagues WHERE id = @id", connection);
                    command.Parameters.AddWithValue("@id", insertedId);

                    using (MySqlDataReader reader = (MySqlDataReader)await command.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            insertedLeague = new League
                            {
                                id = Convert.ToInt32(reader["id"]),
                                name = reader["name"].ToString(),
                                country = reader["country"].ToString(),
                                image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                            };
                        }
                        reader.Close();
                    }
                }
                connection.Close();
            }

            return insertedLeague;
        }

        public Task<bool> DeleteLeague(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("DELETE FROM leagues WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", id);

                int affectedRows = command.ExecuteNonQuery();

                connection.Close();

                return Task.FromResult(affectedRows > 0);
            }
        }

        public Task<IEnumerable<League>> GetAllLeagues()
        {
            using(MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("SELECT * FROM leagues", connection);

                using(MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                {
                    List<League> leagues = new List<League>();

                    while (reader.Read())
                    {
                        leagues.Add(new League
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            country = reader["country"].ToString(),
                            image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                        });
                    }

                    reader.Close();
                    connection.Close();

                    return Task.FromResult<IEnumerable<League>>(leagues);
                }
            }
        }

        public Task<League> GetLeagueById(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("SELECT * FROM leagues WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", id);

                using (MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                {
                    League league = null;

                    if (reader.Read())
                    {
                        league = new League
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            country = reader["country"].ToString(),
                            image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                        };
                    }
                    reader.Close();
                    connection.Close();

                    return Task.FromResult<League>(league);
                }
            }
        }

        public Task<League> UpdateLeague(League league)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("UPDATE leagues SET name = @name, country = @country, image=@image WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", league.id);
                command.Parameters.AddWithValue("@name", league.name);
                command.Parameters.AddWithValue("@country", league.country);
                command.Parameters.AddWithValue("@image", league.image);

                command.ExecuteNonQuery();

                command = new MySqlCommand("SELECT * FROM leagues WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", league.id);

                using (MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                {
                    League updatedLeague = null;

                    if (reader.Read())
                    {
                        updatedLeague = new League
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            country = reader["country"].ToString(),
                            image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                        };
                    }
                    reader.Close();
                    connection.Close();

                    return Task.FromResult<League>(updatedLeague);
                }
            }
        }
    }
}
