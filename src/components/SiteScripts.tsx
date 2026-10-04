'use client';
import { useEffect } from 'react';
export default function SiteScripts() {
  useEffect(() => {
    var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    document.querySelectorAll('[data-year]').forEach(function (el) { (el as HTMLElement).textContent = String(new Date().getFullYear()); });

    var nav = document.querySelector('.nav');
    function onScroll() {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
      var tt = document.querySelector('.to-top'); if (tt) tt.classList.toggle('show', window.scrollY > 500);
    }
    window.addEventListener('scroll', onScroll); onScroll();
    var burger = document.querySelector('.burger') as HTMLElement | null;
    var links = document.querySelector('.nav-links') as HTMLElement | null;
    if (burger && links) burger.addEventListener('click', function () {
      var open = links!.style.display === 'flex';
      links!.style.cssText = open ? '' : 'display:flex;position:absolute;top:66px;left:0;right:0;flex-direction:column;gap:18px;background:#0c0c10;border-bottom:1px solid rgba(255,255,255,.08);padding:22px 26px;z-index:50';
      burger!.setAttribute('aria-expanded', String(!open));
    });
    var tt = document.querySelector('.to-top');
    if (tt) tt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          e.target.querySelectorAll('.bar .fill').forEach(function (f) { var w = (f as HTMLElement).dataset.w; if (w) (f as HTMLElement).style.width = w; });
          io.unobserve(e.target);
        }
      });
    }, { threshold: .15 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });


    function relayoutTimeline() {
      var visible = ([] as Element[]).slice.call(document.querySelectorAll('.tl-item')).filter(function (it) { return !it.classList.contains('hide'); });
      visible.forEach(function (it, i) { it.classList.toggle('tl-left', i % 2 === 0); it.classList.toggle('tl-right', i % 2 === 1); });
    }
    document.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = (btn as HTMLElement).dataset.filter;
        document.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.toggle('active', b === btn); });
        document.querySelectorAll('.tl-item').forEach(function (it) { it.classList.toggle('hide', f !== 'all' && (it as HTMLElement).dataset.cat !== f); });
        relayoutTimeline();
      });
    });
    if (document.querySelector('.tl-item')) relayoutTimeline();

    document.querySelectorAll('[data-pfilter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = (btn as HTMLElement).dataset.pfilter;
        document.querySelectorAll('[data-pfilter]').forEach(function (b) { b.classList.toggle('active', b === btn); });
        document.querySelectorAll('.proj-card').forEach(function (it) { (it as HTMLElement).style.display = (f === 'all' || (it as HTMLElement).dataset.cat === f) ? '' : 'none'; });
      });
    });

    document.querySelectorAll('[data-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var t = (tab as HTMLElement).dataset.tab;
        document.querySelectorAll('[data-tab]').forEach(function (b) { b.classList.toggle('active', b === tab); });
        document.querySelectorAll('[data-pane]').forEach(function (p) {
          var on = (p as HTMLElement).dataset.pane === t; p.classList.toggle('active', on);
          if (on) p.querySelectorAll('.bar .fill').forEach(function (f) { var ww = (f as HTMLElement).dataset.w; if (ww) (f as HTMLElement).style.width = ww; });
        });
      });
    });

    if (!reduce) {
      var canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
      if (canvas) {
        var ctx = canvas.getContext('2d')!;
        var pos = { x: window.innerWidth / 2, y: window.innerHeight * 0.3 };
        var lines: any[] = [];
        var E = { friction: .5, trails: 55, size: 40, dampening: .025, tension: .99 };
        var f: any;
        function Osc(this: any, e: any) { this.phase = e.phase || 0; this.offset = e.offset || 0; this.frequency = e.frequency || .001; this.amplitude = e.amplitude || 1; }
        Osc.prototype.update = function () { this.phase += this.frequency; this.e = this.offset + Math.sin(this.phase) * this.amplitude; return this.e; };
        function Node(this: any) { this.x = 0; this.y = 0; this.vx = 0; this.vy = 0; }
        function Line(this: any, e: any) { this.spring = e.spring + .1 * Math.random() - .05; this.friction = E.friction + .01 * Math.random() - .005; this.nodes = []; for (var i = 0; i < E.size; i++) { var n: any = new (Node as any)(); n.x = pos.x; n.y = pos.y; this.nodes.push(n); } }
        Line.prototype.update = function () { var e = this.spring, t = this.nodes[0]; t.vx += (pos.x - t.x) * e; t.vy += (pos.y - t.y) * e; for (var n, i = 0, a = this.nodes.length; i < a; i++) { t = this.nodes[i]; if (i > 0) { n = this.nodes[i - 1]; t.vx += (n.x - t.x) * e; t.vy += (n.y - t.y) * e; t.vx += n.vx * E.dampening; t.vy += n.vy * E.dampening; } t.vx *= this.friction; t.vy *= this.friction; t.x += t.vx; t.y += t.vy; e *= E.tension; } };
        Line.prototype.draw = function () { var e, t, n = this.nodes[0].x, i = this.nodes[0].y; ctx.beginPath(); ctx.moveTo(n, i); for (var a = 1, o = this.nodes.length - 2; a < o; a++) { e = this.nodes[a]; t = this.nodes[a + 1]; n = .5 * (e.x + t.x); i = .5 * (e.y + t.y); ctx.quadraticCurveTo(e.x, e.y, n, i); } e = this.nodes[a]; t = this.nodes[a + 1]; ctx.quadraticCurveTo(e.x, e.y, t.x, t.y); ctx.stroke(); ctx.closePath(); };
        function resize() { canvas!.width = window.innerWidth; canvas!.height = window.innerHeight; }
        function init() { lines = []; for (var i = 0; i < E.trails; i++) lines.push(new (Line as any)({ spring: .45 + (i / E.trails) * .025 })); }
        function render() { ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, canvas!.width, canvas!.height); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',90%,62%,0.025)'; ctx.lineWidth = 10; for (var i = 0; i < E.trails; i++) { lines[i].update(); lines[i].draw(); } requestAnimationFrame(render); }
        function move(e: any) { if (e.touches) { pos.x = e.touches[0].pageX; pos.y = e.touches[0].pageY; } else { pos.x = e.clientX; pos.y = e.clientY; } }
        f = new (Osc as any)({ phase: Math.random() * 2 * Math.PI, amplitude: 85, frequency: .0015, offset: 230 });
        document.addEventListener('mousemove', move); document.addEventListener('touchmove', move, { passive: true });
        window.addEventListener('resize', resize); resize(); init(); render();
      }
    }
  }, []);
  return null;
}
