using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using asp.net_DayShift.Data; // 确保使用了正确的命名空间

var builder = WebApplication.CreateBuilder(args);

// 添加服务到容器
builder.Services.AddControllers();
// 配置 Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 添加 DbContext，并使用 PostgreSQL 连接字符串
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 添加 GraphQL 服务
builder.Services
       .AddGraphQLServer()
       .AddQueryType<IQuery>(); // 添加查询类型

var app = builder.Build();

// 配置 HTTP 请求管道
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// 配置 GraphQL 端点
app.MapGraphQL();

app.Run();
