﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackFinalProject.Controllers
{
    public class TeamsController : ApiController
    {
        // GET: api/Teams
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Teams/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Teams
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Teams/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Teams/5
        public void Delete(int id)
        {
        }
    }
}
