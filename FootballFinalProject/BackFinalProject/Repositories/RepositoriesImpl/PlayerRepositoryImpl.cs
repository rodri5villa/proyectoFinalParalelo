using BackFinalProject.Models;
using BackFinalProject.Repositories.IRepositories;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Drawing.Text;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace BackFinalProject.Repositories.RepositoriesImpl
{
    public class PlayerRepositoryImpl : IPlayerRepository
    {

        private string connectionString = "server=localhost;port=3306;database=leagues_football;user=root;password=;";

        public async Task<Player> AddPlayer(Player player)
        {
            Player insertedPlayer = null;

            using(MySqlConnection connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();

                MySqlCommand command = new MySqlCommand("INSERT INTO players (name, lastName, attack, defense, pass, teamId, image) VALUES (@name, @lastName, @attack, @defense, @pass, @teamId, @image); SELECT LAST_INSERT_ID();", connection);
                command.Parameters.AddWithValue("@name", player.name);
                command.Parameters.AddWithValue("@lastName", player.lastName);
                command.Parameters.AddWithValue("@attack", player.attack);
                command.Parameters.AddWithValue("@defense", player.defense);
                command.Parameters.AddWithValue("@pass", player.pass);
                command.Parameters.AddWithValue("@teamId", player.teamId);
                command.Parameters.AddWithValue("@image", player.image);

                object result = await command.ExecuteScalarAsync();
                long insertedId = (result != null && result != DBNull.Value) ? Convert.ToInt64(result) : -1;

                if (insertedId != -1)
                {
                    command = new MySqlCommand("SELECT * FROM players WHERE id = @id", connection);
                    command.Parameters.AddWithValue("@id", insertedId);

                    using(MySqlDataReader reader = (MySqlDataReader)await command.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            insertedPlayer = new Player
                            {
                                id = Convert.ToInt32(reader["id"]),
                                name = reader["name"].ToString(),
                                lastName = reader["lastName"].ToString(),
                                attack = Convert.ToInt32(reader["attack"]),
                                defense = Convert.ToInt32(reader["defense"]),
                                pass = Convert.ToInt32(reader["pass"]),
                                teamId = Convert.ToInt32(reader["teamId"]),
                                image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                            };
                        }
                        reader.Close();
                    }
                }   
                connection.Close();

                return insertedPlayer;

                }
        }

        public Task<bool> DeletePlayer(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("DELETE FROM players WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", id);

                int affectedRows = command.ExecuteNonQuery();

                connection.Close();

                return Task.FromResult(affectedRows > 0);
            }
        }

        public Task<IEnumerable<Player>> GetAllPlayers()
        {
            using(MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("SELECT * FROM players", connection);

                using(MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                {
                    List<Player> players = new List<Player>();

                    while (reader.Read())
                    {
                        players.Add(new Player
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            lastName = reader["lastName"].ToString(),
                            attack = Convert.ToInt32(reader["attack"]),
                            defense = Convert.ToInt32(reader["defense"]),
                            pass = Convert.ToInt32(reader["pass"]),
                            teamId = Convert.ToInt32(reader["teamId"]),
                            image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                        });
                    }
                    reader.Close();

                    return Task.FromResult<IEnumerable<Player>>(players);
                }
            }
        }

        public Task<Player> GetPlayerById(int id)
        {
            using(MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("SELECT * FROM players WHERE id = @id", connection);
                command.Parameters.AddWithValue("@id", id);

                using(MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                {
                    Player player = null;

                    if (reader.Read())
                    {
                        player = new Player
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            lastName = reader["lastName"].ToString(),
                            attack = Convert.ToInt32(reader["attack"]),
                            defense = Convert.ToInt32(reader["defense"]),
                            pass = Convert.ToInt32(reader["pass"]),
                            teamId = Convert.ToInt32(reader["teamId"]),
                            image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                        };
                    }
                    reader.Close();

                    return Task.FromResult<Player>(player);
                }
            }
        }

        public Task<IEnumerable<Player>> GetPlayersByTeamId(int teamId)
        {
            using(MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("SELECT * FROM players WHERE teamId = @teamId", connection);
                command.Parameters.AddWithValue("@teamId", teamId);

                using(MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                {
                    List<Player> players = new List<Player>();

                    while (reader.Read())
                    {
                        players.Add(new Player
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            lastName = reader["lastName"].ToString(),
                            attack = Convert.ToInt32(reader["attack"]),
                            defense = Convert.ToInt32(reader["defense"]),
                            pass = Convert.ToInt32(reader["pass"]),
                            teamId = Convert.ToInt32(reader["teamId"]),
                            image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                        });
                    }
                    reader.Close();

                    return Task.FromResult<IEnumerable<Player>>(players);
                }
            }
        }

        public Task<Player> UpdatePlayer(Player player)
        {
            Player updatedPlayer = null;

            using(MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("UPDATE players SET name = @name, lastName = @lastName, attack = @attack, defense = @defense, pass = @pass, teamId = @teamId, image = @image WHERE id = @id", connection);
                command.Parameters.AddWithValue("@name", player.name);
                command.Parameters.AddWithValue("@lastName", player.lastName);
                command.Parameters.AddWithValue("@attack", player.attack);
                command.Parameters.AddWithValue("@defense", player.defense);
                command.Parameters.AddWithValue("@pass", player.pass);
                command.Parameters.AddWithValue("@teamId", player.teamId);
                command.Parameters.AddWithValue("@id", player.id);
                command.Parameters.AddWithValue("@image", player.image);

                int affectedRows = command.ExecuteNonQuery();

                if (affectedRows > 0)
                {
                    command = new MySqlCommand("SELECT * FROM players WHERE id = @id", connection);
                    command.Parameters.AddWithValue("@id", player.id);

                    using(MySqlDataReader reader = (MySqlDataReader)command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            updatedPlayer = new Player
                            {
                                id = Convert.ToInt32(reader["id"]),
                                name = reader["name"].ToString(),
                                lastName = reader["lastName"].ToString(),
                                attack = Convert.ToInt32(reader["attack"]),
                                defense = Convert.ToInt32(reader["defense"]),
                                pass = Convert.ToInt32(reader["pass"]),
                                teamId = Convert.ToInt32(reader["teamId"]),
                                image = reader["image"] != DBNull.Value ? (byte[])reader["image"] : null
                            };
                        }
                        reader.Close();
                    }
                }
                connection.Close();

                return Task.FromResult<Player>(updatedPlayer);
            }
        }
    }
}