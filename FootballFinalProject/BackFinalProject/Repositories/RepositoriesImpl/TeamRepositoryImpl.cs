﻿using BackFinalProject.Models;
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

                MySqlCommand command = new MySqlCommand("INSERT INTO teams (name, city, leagueId) VALUES (@name, @city, @leagueId); SELECT LAST_INSERT_ID();", connection);
                command.Parameters.AddWithValue("@name", team.name);
                command.Parameters.AddWithValue("@city", team.city);
                command.Parameters.AddWithValue("@leagueId", team.leagueId);

                object result = await command.ExecuteScalarAsync();
                long insertedId = (result != null && result != DBNull.Value) ? Convert.ToInt64(result) : -1;

                if (insertedId != -1)
                {
                    // Realizar una consulta para obtener la liga recién creada
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
                                leagueId = Convert.ToInt32(reader["leagueId"])
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
            throw new NotImplementedException();
        }

        public Task<Team> GetTeamById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Team>> GetTeamsByLeagueId(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Team> UpdateTeam(Team team)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTeam(int id)
        {
            throw new NotImplementedException();
        }
    }
}