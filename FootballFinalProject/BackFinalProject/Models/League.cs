using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BackFinalProject.Models
{
    public class League
    {
        public long id { get; set; }

        [Required(ErrorMessage ="The name is required.")]
        [StringLength(100, ErrorMessage = "The name must be 100 characters long.")]
        public string name { get; set; }

        [Required(ErrorMessage = "The country is required.")]
        [StringLength(100, ErrorMessage = "The country must be 100 characters long.")]
        public string country { get; set; }
        public byte[] image { get; set; }
    }
}