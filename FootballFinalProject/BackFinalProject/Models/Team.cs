using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BackFinalProject.Models
{
    public class Team
    {
        public long id { get; set; }

        [Required(ErrorMessage = "The name is required.")]
        [StringLength(100, ErrorMessage = "The name must be 100 characters long.")]
        public string name { get; set; }

        [Required(ErrorMessage = "The city is required.")]
        [StringLength(100, ErrorMessage = "The city must be 100 characters long.")]
        public string city { get; set; }
        public int leagueId { get; set; }
        public byte[] image { get; set; }

    }
}