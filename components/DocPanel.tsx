
import React from 'react';
import { Database, Server, Code2, Layers, Cpu, ShieldAlert } from 'lucide-react';

const DocPanel: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <section>
        <h2 className="text-2xl font-gaming font-bold mb-6 flex items-center gap-3">
          <Layers className="text-indigo-500" />
          SYSTEM ARCHITECTURE
        </h2>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Cpu size={120} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/30">
                <Code2 className="text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-blue-400">Frontend</h4>
                <p className="text-xs text-slate-500">React + Tailwind + Chart.js</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30">
                <Server className="text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-400">Backend</h4>
                <p className="text-xs text-slate-500">Java Spring Boot (REST API)</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto border border-purple-500/30">
                <Database className="text-purple-400" />
              </div>
              <div>
                <h4 className="font-bold text-purple-400">Database</h4>
                <p className="text-xs text-slate-500">MySQL / JPA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-gaming font-bold mb-4 flex items-center gap-2">
            <Database className="text-purple-500 w-5 h-5" />
            MYSQL SCHEMA
          </h3>
          <pre className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-[10px] text-slate-400 overflow-x-auto">
{`CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  xp BIGINT DEFAULT 0,
  level INT DEFAULT 1,
  coins INT DEFAULT 0
);

CREATE TABLE habits (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  name VARCHAR(100),
  type ENUM('RUN','STUDY','GYM','CODE'),
  curr_streak INT DEFAULT 0,
  max_streak INT DEFAULT 0,
  last_checked_in DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE xp_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  amount INT,
  source VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
          </pre>
        </div>

        <div>
          <h3 className="text-xl font-gaming font-bold mb-4 flex items-center gap-2">
            <ShieldAlert className="text-orange-500 w-5 h-5" />
            XP FORMULAS
          </h3>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Base Check-in</p>
              <p className="text-sm font-mono bg-slate-950 p-2 rounded">XP += 10</p>
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Streak Bonus (>7 days)</p>
              <p className="text-sm font-mono bg-slate-950 p-2 rounded">XP += 5 * floor(streak / 7)</p>
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Level Curve</p>
              <p className="text-sm font-mono bg-slate-950 p-2 rounded">Level = floor(sqrt(total_xp / 10)) + 1</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-gaming font-bold mb-4 flex items-center gap-2">
          <Server className="text-emerald-500 w-5 h-5" />
          SPRING BOOT REST API (DTO Example)
        </h3>
        <pre className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-xs text-slate-400 overflow-x-auto leading-relaxed">
{`@Data
@AllArgsConstructor
public class UserStatsDTO {
    private String username;
    private Long totalXp;
    private Integer level;
    private List<DailyXpProjection> last30DaysXp;
}

@RestController
@RequestMapping("/api/stats")
public class StatsController {
    
    @Autowired
    private XpLogRepository xpLogRepo;

    @GetMapping("/{userId}")
    public ResponseEntity<UserStatsDTO> getDashboard(@PathVariable Long userId) {
        // Aggregation logic...
        return ResponseEntity.ok(stats);
    }
}`}
        </pre>
      </section>
    </div>
  );
};

export default DocPanel;
