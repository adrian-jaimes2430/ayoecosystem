import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { businessUnits, experienceCopy } from "@/history/experienceContent";

const labStyle = `
  .history-lab{min-height:100vh;background:#050505;color:#f4eee8;font-family:Inter,ui-sans-serif,system-ui,sans-serif;overflow-x:hidden}
  .history-lab *{box-sizing:border-box}
  .lab-noise{position:fixed;inset:0;pointer-events:none;opacity:.06;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E")}
  .lab-nav{position:fixed;z-index:20;top:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:22px 4vw;mix-blend-mode:screen}
  .lab-logo{font-weight:900;letter-spacing:-.08em;font-size:25px;color:#fff;text-decoration:none}.lab-logo span{color:#ff493d}
  .lab-nav small{font-size:10px;letter-spacing:.24em;color:#b9aaa0}
  .lab-hero{min-height:100vh;display:grid;place-items:center;position:relative;padding:120px 6vw 80px}
  .lab-orb{position:absolute;width:min(55vw,650px);height:min(55vw,650px);border-radius:50%;background:radial-gradient(circle at 45% 40%,#fff8f1 0 2%,#d9cfc5 3% 9%,#6f6259 18%,#1b1715 48%,transparent 69%);filter:drop-shadow(0 0 90px #ff3b3030);transform:perspective(900px) rotateX(62deg) rotateZ(-18deg);animation:labFloat 7s ease-in-out infinite;opacity:.78}
  .lab-orb:before,.lab-orb:after{content:"";position:absolute;inset:-7%;border:1px solid #ff4a3d55;border-radius:50%;transform:rotateX(68deg) rotateY(14deg) rotateZ(18deg)}
  .lab-orb:after{inset:-15%;border-color:#f7eee622;transform:rotateX(68deg) rotateY(-20deg) rotateZ(-9deg)}
  @keyframes labFloat{50%{transform:perspective(900px) rotateX(62deg) rotateZ(-14deg) translateY(-18px) scale(1.02)}}
  .lab-hero-copy{position:relative;z-index:2;max-width:940px;text-align:center}.lab-kicker{font-size:11px;letter-spacing:.38em;color:#ff665b;font-weight:800}.lab-hero h1{font-size:clamp(42px,7.3vw,106px);line-height:.91;letter-spacing:-.07em;margin:24px 0 26px;text-wrap:balance}.lab-hero p{max-width:700px;margin:auto;color:#c9beb7;font-size:clamp(16px,1.6vw,21px);line-height:1.65}.lab-scroll{margin-top:48px;color:#8f8179;font-size:10px;letter-spacing:.25em}
  .lab-units{position:relative;z-index:3;padding:80px 5vw 130px;background:linear-gradient(180deg,transparent,#080706 12%,#080706)}.lab-section-head{max-width:850px;margin:0 auto 55px;text-align:center}.lab-section-head h2{font-size:clamp(30px,4.5vw,60px);letter-spacing:-.05em;margin:14px 0}.lab-section-head p{color:#988c85;font-size:14px;letter-spacing:.08em}
  .unit-grid{max-width:1250px;margin:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.unit-card{position:relative;min-height:330px;padding:30px;border:1px solid #ffffff14;background:linear-gradient(145deg,#151210,#080808);border-radius:28px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;justify-content:space-between;transform-style:preserve-3d;transition:transform .45s cubic-bezier(.2,.75,.2,1),border-color .3s,box-shadow .3s}.unit-card:hover{transform:perspective(1000px) rotateX(4deg) rotateY(-4deg) translateY(-7px);border-color:#ff4b404d;box-shadow:0 30px 90px #000,0 0 50px #ff3b3010}.unit-card:before{content:"";position:absolute;width:230px;height:230px;right:-80px;top:-80px;border-radius:50%;background:radial-gradient(circle,#ff493d44,transparent 68%);filter:blur(5px)}.unit-top{display:flex;justify-content:space-between;align-items:center;position:relative}.unit-number{font-size:10px;letter-spacing:.2em;color:#665c56}.unit-status{font-size:9px;letter-spacing:.18em;color:#ff7067}.unit-card h3{position:relative;font-size:clamp(30px,4vw,54px);letter-spacing:-.06em;margin:45px 0 12px}.unit-card p{position:relative;max-width:480px;color:#aaa09a;line-height:1.6;font-size:14px}.unit-bottom{position:relative;display:flex;justify-content:space-between;align-items:end;margin-top:34px}.unit-eyebrow{font-size:9px;letter-spacing:.2em;color:#7d726c;max-width:70%}.unit-cta{font-size:9px;letter-spacing:.18em;color:#fff;border-bottom:1px solid #ff493d;padding-bottom:5px;white-space:nowrap}.unit-card.disabled{cursor:default;opacity:.62}.unit-card.disabled:hover{transform:none;box-shadow:none}
  .lab-note{max-width:1250px;margin:25px auto 0;padding:18px 22px;border:1px dashed #ffffff18;border-radius:16px;color:#756b65;font-size:11px;line-height:1.6;letter-spacing:.04em}.lab-note b{color:#a89b93}
  .lab-footer{padding:40px 5vw 60px;border-top:1px solid #ffffff10;display:flex;justify-content:space-between;gap:20px;color:#625a55;font-size:10px;letter-spacing:.18em}.lab-footer a{color:#aaa09a;text-decoration:none}
  @media(max-width:760px){.lab-nav{padding:18px 20px}.lab-nav small{display:none}.lab-hero{padding:100px 24px 70px}.lab-orb{width:90vw;height:90vw}.unit-grid{grid-template-columns:1fr}.unit-card{min-height:300px;border-radius:22px}.lab-units{padding-left:20px;padding-right:20px}.lab-footer{flex-direction:column}.unit-bottom{align-items:flex-start;gap:18px;flex-direction:column}}
`;

export default function HistoryLab() {
  const [active, setActive] = useState("");

  useEffect(() => {
    document.title = "A&O Ecosystem — History Lab";
    return () => { document.title = "A&O Ecosystem"; };
  }, []);

  return (
    <main className="history-lab">
      <style>{labStyle}</style>
      <div className="lab-noise" />
      <header className="lab-nav">
        <Link to="/" className="lab-logo">A<span>&</span>O</Link>
        <small>HISTORY LAB · V1 · EXPERIMENTAL</small>
        <Link to="/" className="lab-logo" style={{fontSize:10,letterSpacing:'.2em'}}>EXIT</Link>
      </header>

      <section className="lab-hero">
        <div className="lab-orb" aria-hidden="true" />
        <div className="lab-hero-copy">
          <div className="lab-kicker">{experienceCopy.kicker}</div>
          <h1>{experienceCopy.title}</h1>
          <p>{experienceCopy.body}</p>
          <div className="lab-scroll">{experienceCopy.interactionHint}</div>
        </div>
      </section>

      <section className="lab-units">
        <div className="lab-section-head">
          <div className="lab-kicker">{experienceCopy.unitsLabel}</div>
          <h2>CUATRO PUERTAS. UNA MISMA ARQUITECTURA.</h2>
          <p>Esta zona es el laboratorio para validar jerarquía, navegación, copy y comportamiento antes de llevarlo a producción.</p>
        </div>

        <div className="unit-grid">
          {businessUnits.map((unit, i) => {
            const isDisabled = !unit.route;
            const card = (
              <article
                className={`unit-card${isDisabled ? " disabled" : ""}`}
                onMouseEnter={() => setActive(unit.id)}
                onMouseLeave={() => setActive("")}
                aria-label={isDisabled ? `${unit.name} — ${unit.status}` : `Abrir ${unit.name}`}
              >
                <div>
                  <div className="unit-top"><span className="unit-number">0{i + 1}</span><span className="unit-status">{unit.status}</span></div>
                  <h3>{unit.name}</h3>
                  <p>{unit.description}</p>
                </div>
                <div className="unit-bottom"><span className="unit-eyebrow">{unit.eyebrow}</span><span className="unit-cta">{unit.cta}</span></div>
                {active === unit.id && !isDisabled && <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(circle at 70% 30%,#ff493d10,transparent 35%)"}} />}
              </article>
            );
            return isDisabled ? <div key={unit.id}>{card}</div> : <Link key={unit.id} to={unit.route}>{card}</Link>;
          })}
        </div>

        <div className="lab-note"><b>LAB NOTE:</b> Los copys, estados, CTA y rutas de esta experiencia viven en <b>src/history/experienceContent.ts</b>. La intención es que el contenido pueda evolucionar sin tocar el motor visual ni consumir créditos de Lovable.</div>
      </section>

      <footer className="lab-footer"><span>A&O ECOSYSTEM · EXPERIMENTAL BUILD</span><Link to="/history-cinematic">OPEN CINEMATIC LEGACY</Link></footer>
    </main>
  );
}
