﻿using Infra;
using Microsoft.Extensions.DependencyInjection;


namespace Testes
{
    public class TesteBase : IDisposable
    {
        protected ServiceProvider _serviceProvider { get; set; }            
        public TesteBase()
        {
            _serviceProvider = ObterServiceCollections().BuildServiceProvider();
        }
        public ServiceCollection ObterServiceCollections()
        {
            var serviceCollection = new ServiceCollection();
            ModuloDeInjecaoTestes.BindServices(serviceCollection);
            ModuloDeInjecaoInfra.BindServices(serviceCollection);
            return serviceCollection;
        }
        public void Dispose() { }
    }
}
