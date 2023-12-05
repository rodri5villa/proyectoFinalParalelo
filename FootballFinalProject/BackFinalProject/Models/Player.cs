using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackFinalProject.Models
{
    public class Player
    {
        public long id { get; set; }
        public string name { get; set; }
        public string lastName { get; set; }
        public int attack { get; set; }
        public int defense { get; set; }
        public int pass { get; set; }
        public int teamId { get; set; }
        public byte[] image { get; set; }

    }
}