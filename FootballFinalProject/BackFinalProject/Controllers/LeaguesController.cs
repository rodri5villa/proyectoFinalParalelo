using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackFinalProject.Controllers
{
    public class LeaguesController : ApiController
    {
        // GET: api/Leagues
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Leagues/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Leagues
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Leagues/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Leagues/5
        public void Delete(int id)
        {
        }
    }
}
