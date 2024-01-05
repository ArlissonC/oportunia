using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Oportunia.Data.Interfaces;
using Oportunia.Domain;
using Oportunia.Domain.Configuration;
using Oportunia.Domain.Requests;
using System.Data;
using System.Reflection;

namespace Oportunia.Data.Repositories;

public class AddressRepository : IAddressRepository
{
    private readonly IDbConnection _connection;

    public AddressRepository(IOptions<DatabaseConfig> configuration)
    {
        _connection = new SqlConnection(configuration.Value.ApplicationConnection);
    }

    public async Task<Address> GetAddressByUserAsync(Guid userId)
    {
        try
        {
            var query = $@"SELECT * FROM Address WHERE UserId = @UserId";
            var response = await _connection.QueryAsync<Address>(query, param: new { userId });

            return response.FirstOrDefault()!;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task UpdateAddressAsync(UpdateAddressRequest model)
    {
        try
        {
            var query = $@"UPDATE Address SET Cep = @Cep, Street = @Street, State = @State, City = @City, Neighborhood = @Neighborhood, Number = @Number
                            WHERE Id = @Id";

            await _connection.ExecuteAsync(query, model);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
