using System;
using System.Data.Entity.Infrastructure;
using System.Web.Http.Description;
using System.Collections.Generic;
using System.Web.Http.Cors;
using System.Data.Entity;
using System.Net.Http;
using System.Web.Http;
using APIMVC.Models;
using System.Linq;
using System.Net;

namespace APIMVC.Controllers
{
    
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]

    public class EmployeeController : ApiController
    {
        private employeeEntities db = new employeeEntities();

        public IQueryable <employee> getList()
        {
            return db.employees;
        }

        [HttpGet]
        public IHttpActionResult Get(string id)
        {
            employee employee = db.employees.Find(id);
            if(employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        public IHttpActionResult Post(employee employee)
        {
  
            db.employees.Add(employee);
            db.SaveChanges();

            return CreatedAtRoute("employee",new { id = employee.id } , new { status = 1, data = employee });

        }


        [HttpDelete]
        public IHttpActionResult Delete(string id)
        {
            employee employee = db.employees.Find(id);

            if (employee == null)
            {
                return NotFound();
            }

            db.employees.Remove(employee);
            db.SaveChanges();
            
            return CreatedAtRoute("employee", new { id = employee.id }, new { status = 1,msg = "Delete id "+employee.id+" Successful !" });

        }


        [HttpPut]
        public IHttpActionResult Update(string id , employee paramsEmployee)
        {

            if (id != paramsEmployee.id)
            {
                return BadRequest();
            }

            db.Entry(paramsEmployee).State = EntityState.Modified;

        
            db.SaveChanges();


            return CreatedAtRoute("employee", new { id = paramsEmployee.id }, new { status = 1, msg = "Update id " + paramsEmployee.id + " Successful !" });

        }
    }
}
