using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NameApplication.Data.Models;
using NameApplication.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NameApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NamesController : ControllerBase
    {
        private readonly ILogger<NamesController> _logger;
        private readonly IRepository<NameEntry> _repository;

        public NamesController(ILogger<NamesController> logger, IRepository<NameEntry> repository)
        {
            _logger = logger;
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<NameEntry> Get()
        {
            return _repository.GetAll();
        }

        [HttpGet("{name}")]
        public IEnumerable<NameEntry> GetByName(string name)
        {
            return _repository.GetByName(name);
        }

        [HttpGet("orderbyname")]
        public IEnumerable<NameEntry> OrderByName(string attribute)
        {
            return _repository.GetAll().OrderBy(x => x.Name);
        }

        [HttpGet("orderbyamount")]
        public IEnumerable<NameEntry> OrderByAmount(string attribute)
        {
            return _repository.GetAll().OrderByDescending(x => x.Amount);
        }

        [HttpGet("totalamount")]
        public int TotalAmountOfAllNames()
        {
            return _repository.GetAll().Sum(x => x.Amount);
        }

        [HttpGet("totalamountbyname")]
        public int TotalAmountByName(string name)
        {
            var nameEntry = _repository.GetAll()
                .FirstOrDefault(x => x.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase));

            return nameEntry == null ? 0 : nameEntry.Amount;
        }
    }
}
