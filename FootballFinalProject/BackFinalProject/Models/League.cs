using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackFinalProject.Models
{
    public class League
    {
        public long id { get; set; }
        public string name { get; set; }
        public string country { get; set; }
        public byte[] image { get; set; }
    }
}