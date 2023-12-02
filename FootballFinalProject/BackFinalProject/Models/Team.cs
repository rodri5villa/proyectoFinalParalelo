using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackFinalProject.Models
{
    public class Team
    {
        public long id { get; set; }
        public string name { get; set; }
        public string city { get; set; }
        public int leagueId { get; set; }
    }
}