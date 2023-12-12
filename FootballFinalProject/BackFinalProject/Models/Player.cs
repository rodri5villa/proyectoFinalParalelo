using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BackFinalProject.Models
{
    public class Player
    {
        public long id { get; set; }

        [Required(ErrorMessage = "The name is required.")]
        [StringLength(100, ErrorMessage = "The name must be 100 characters long.")]
        public string name { get; set; }
        [Required(ErrorMessage = "The last name is required.")]
        [StringLength(100, ErrorMessage = "The last name must be 100 characters long.")]
        public string lastName { get; set; }
        public int attack { get; set; }
        public int defense { get; set; }
        public int pass { get; set; }
        public int teamId { get; set; }
        public byte[] image { get; set; }

    }
}