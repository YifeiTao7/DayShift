namespace asp.net_DayShift.Data
{
    public class User
    {
        public int Id { get; set; } // 唯一标识符
        public string Username { get; set; } // 用户名
        public string Email { get; set; } // 邮箱
        public string PasswordHash { get; set; } // 哈希密码

        // 与班表的关系：一个用户可以有多个班表，Schedules 字段现在是可选的
        public List<Schedule>? Schedules { get; set; }

        // 角色（员工或老板）
        public string Role { get; set; } // 角色，可以是 "Employee" 或 "Boss"

        // 状态
        public bool IsSchedulePublished { get; set; } // 是否发布了班表
        public bool NeedsShiftChange { get; set; } // 是否需要换班
    }
}
