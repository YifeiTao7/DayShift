namespace asp.net_DayShift.Data
{
    public class Schedule
    {
        public int Id { get; set; } // 班表唯一标识符
        public DateTime ShiftDate { get; set; } // 班表日期
        public string ShiftTime { get; set; } // 班次时间 (如: "09:00-17:00")

        // 与用户的关系：每个班表都属于一个用户
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
