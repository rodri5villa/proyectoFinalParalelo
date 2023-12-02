using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace BackFinalProject.Data
{
    public class ConectionDB
    {
        private string server= "server=localhost;port=3306;database=leagues_football;user=root;password=;";
        public MySqlConnection conection = new MySqlConnection();

        public void OpenConection()
        {
            try
            {
                conection.ConnectionString = server;
                conection.Open();
                System.Diagnostics.Debug.WriteLine("Conexion abierta");
            }catch(Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("Error al abrir la conexion");
            }
            
        }
    }
}
