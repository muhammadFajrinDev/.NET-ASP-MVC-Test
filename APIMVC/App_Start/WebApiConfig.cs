using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using System.Net.Http;
using System.Net.Http.Headers;


namespace APIMVC
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            config.EnableCors();

            config.Routes.MapHttpRoute(
                name: "employee",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        }
    }
}
