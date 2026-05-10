import React, { useState, useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";
import {
  Menu, X, ChevronDown, CheckCircle, ArrowRight, Video, FileText,
  Calendar, Activity, Droplets, Target, User, Mail, Camera,
  Award, Clock, ShieldCheck, ChevronRight, Trophy, Newspaper, Trash2
} from 'lucide-react';

// --- COMPOSANTS REUTILISABLES ---

const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform active:scale-95";
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:-translate-y-0.5",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:bg-slate-50 hover:-translate-y-0.5 shadow-sm",
    outlineDark: "border border-white/20 text-white hover:bg-white/10 hover:text-white hover:-translate-y-0.5",
    accent: "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:-translate-y-0.5"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    {subtitle && <span className="inline-block bg-blue-50 text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">{subtitle}</span>}
    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{title}</h2>
    <div className={`w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-lg text-slate-800 hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const PressCard = ({ date, title, description, badge, image, source }) => (
  <div className="bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group flex flex-col h-full">
    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 group-hover:bg-cyan-400 transition-colors duration-300 z-10"></div>

    {/* Section Image avec sécurité au cas où l'image n'est pas trouvée localement */}
    {image && (
      <div className="h-48 overflow-hidden relative border-b border-slate-100 bg-slate-100 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            // Image de secours si tes fichiers locaux ne sont pas encore bien placés
            e.target.src = "https://images.unsplash.com/photo-1584852932338-7694cc02a5c9?q=80&w=600&auto=format&fit=crop";
          }}
        />
      </div>
    )}

    {/* Section Texte */}
    <div className="p-8 flex-grow flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
          <Newspaper className="w-3 h-3 text-blue-600" /> {source}
        </span>
        <span className="text-xs text-slate-400 font-medium">{date}</span>
      </div>
      <div className="text-blue-600 text-xs font-bold mb-2 tracking-wide uppercase">{badge}</div>
      <h4 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed mt-auto">{description}</p>
    </div>
  </div>
);

const EswimLogo = ({ className = "w-10 h-10" }) => (
  <img src="/logo.png" alt="Eswim Logo" className={`object-contain rounded-lg ${className}`} />
);

// --- PAGES ---

const Home = ({ navigate }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <section className="relative bg-slate-950 text-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <img src="https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Nageur sous l'eau" className="w-full h-full object-cover mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 animate-fade-in">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-sm">
            <Activity className="w-4 h-4" /> Analyse Biomécanique Premium
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight md:leading-[1.1] mb-8 tracking-tight">
            Nagez plus vite. <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Fatiguez-vous moins.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-light">
            L'analyse biomécanique vidéo et le plan d'entraînement sur-mesure pour exploser vos chronos. Arrêtez de nager plus pour stagner, corrigez ce qui vous freine vraiment.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Button onClick={() => navigate('contact')} className="text-lg px-8 py-4">
              Commencer mon analyse
            </Button>
            <Button variant="outlineDark" onClick={() => navigate('service')} className="text-lg px-8 py-4 backdrop-blur-sm">
              Découvrir la méthode
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Problème */}
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Vous avez l'impression de lutter contre l'eau ?</h2>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Faire plus de longueurs ne suffit pas. Si votre technique est mauvaise, augmenter le volume ne fait que renforcer vos défauts et accroître la fatigue. Le vrai levier de progression n'est pas l'effort brut, mais la <strong>qualité de votre geste</strong>. Une meilleure mécanique permet d'aller plus vite en dépensant moins d'énergie.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          <div className="p-6 bg-slate-50 rounded-xl">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Jambes qui coulent</h3>
            <p className="text-slate-700 text-base">Un mauvais alignement crée une résistance énorme qui vous freine à chaque cycle.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Appuis fuyants</h3>
            <p className="text-slate-700 text-base">Vos mains glissent dans l'eau au lieu de s'ancrer, ruinant votre propulsion.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Essoufflement rapide</h3>
            <p className="text-slate-700 text-base">Une respiration mal synchronisée casse votre rythme et crée de la panique.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Solution */}
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          subtitle="La Solution"
          title="Une analyse précise pour corriger ce qui vous freine vraiment"
        />
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Analyse vidéo natation" className="rounded-2xl shadow-2xl" />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              Mon service se déroule 100% à distance, de manière asynchrone. Pas besoin de bloquer un rendez-vous à la piscine. Vous vous filmez quand vous voulez, je vous apporte l'expertise d'un athlète et coach directement sur votre écran.
            </p>
            <ul className="space-y-4">
              {[
                "Observation fine du geste au ralenti",
                "Identification des freins moteurs invisibles à l'œil nu",
                "Correction individualisée basée sur la biomécanique",
                "Plan d'action concret et progressif sur 4 semaines"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Pack */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          subtitle="L'Offre"
          title="Une offre simple pour progresser vite et durablement"
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <div className="bg-white border border-slate-100 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            <div className="w-14 h-14 bg-blue-50/80 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 group-hover:scale-110 shadow-sm">
              <Video className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">1. Le Protocole (6 semaines)</h3>
            <p className="text-slate-700 text-base leading-relaxed">
              Le coeur de l'accompagnement : un bilan clair de votre nage, un plan précis sur 6 semaines, un suivi chaque semaine et un contact direct WhatsApp.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            <div className="w-14 h-14 bg-blue-50/80 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 group-hover:scale-110 shadow-sm">
              <Activity className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">2. L'Immersion "Sur le Terrain"</h3>
            <p className="text-slate-700 text-base leading-relaxed">
              L'option premium : je viens au bord du bassin pour vous corriger en direct et vous faire progresser plus vite.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            <div className="w-14 h-14 bg-blue-50/80 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 group-hover:scale-110 shadow-sm">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">3. Le Cercle de Continuité</h3>
            <p className="text-slate-700 text-base leading-relaxed">
              Le suivi long terme : un abonnement mensuel pour continuer à progresser après les 6 semaines.
            </p>
          </div>
        </div>

        <div className="text-center bg-slate-900 text-white rounded-2xl p-10 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <h3 className="text-3xl font-bold mb-6 relative z-10">Prêt à améliorer votre nage ?</h3>
          <p className="text-slate-300 mb-10 text-sm relative z-10">Prenons quelques minutes pour faire le point sur votre niveau actuel, vos objectifs et les leviers concrets à activer. Vous repartez avec une vision claire de la meilleure stratégie pour progresser rapidement et durablement.</p>
          <Button onClick={() => navigate('contact')} className="w-full sm:w-auto text-lg px-10 py-4 relative z-10">
            Parlons-en
          </Button>
        </div>
      </div>
    </section>

    {/* Comment ça marche */}
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Processus 100% sans risque" title="Comment ça marche ?" />
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[48px] left-[16%] right-[16%] h-0.5 bg-slate-200 z-0"></div>

          <div className="relative z-10 text-center">
            <div className="w-24 h-24 bg-white border-4 border-slate-50 shadow-md rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">1. Filmez-vous</h3>
            <p className="text-slate-600">Demandez votre <strong>guide de captation gratuit</strong>. Filmez-vous à la piscine avec un smartphone ou une GoPro, puis envoyez-moi vos vidéos.</p>
          </div>

          <div className="relative z-10 text-center">
            <div className="w-24 h-24 bg-blue-600 border-4 border-slate-50 shadow-md text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Appel Découverte</h3>
            <p className="text-slate-600">Nous échangeons de vive voix pendant 15 minutes en visio pour discuter de vos objectifs et m'assurer que je peux vous aider.</p>
          </div>

          <div className="relative z-10 text-center">
            <div className="w-24 h-24 bg-white border-4 border-slate-50 shadow-md rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">3. Recevez l'analyse</h3>
            <p className="text-slate-600">Sous 72h après l'envoi de vos vidéos, recevez votre vidéo commentée, votre bilan complet et votre plan correctif pour transformer votre nage.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Bénéfices & Crédibilité */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Les bénéfices concrets</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Nager plus efficacement",
              "Réduire la fatigue inutile",
              "Mieux sentir l'eau",
              "Corriger les défauts invisibles",
              "Progresser sans volume excessif",
              "Transformer technique en vitesse"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg">
                <Target className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="font-medium text-slate-700 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-10 lg:p-14 rounded-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/30 blur-3xl rounded-full"></div>
          <Award className="w-12 h-12 text-cyan-400 mb-6 relative z-10" />
          <h3 className="text-2xl font-bold mb-6 relative z-10 leading-snug">L'exigence du haut niveau à votre service</h3>
          <p className="text-slate-300 mb-8 leading-relaxed relative z-10">
            Mon approche n'est pas basée sur des conseils génériques de bord de bassin. En tant que compétiteur (médaillé aux championnats Francophones et Wallons), je sais ce que l'exigence du chronomètre implique. Je décortique ce que l'œil nu ne peut pas voir pour vous apporter des solutions qui fonctionnent réellement.
          </p>
          <Button variant="outlineDark" onClick={() => navigate('about')} className="w-full sm:w-auto relative z-10">
            Découvrir mon palmarès et parcours
          </Button>
        </div>
      </div>
    </section>

    {/* FAQ & Garantie */}
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading subtitle="Questions Fréquentes" title="Tout ce que vous devez savoir" />
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-10">
          <FAQItem
            question="À qui s'adresse ce service ?"
            answer="À tous les nageurs réguliers, triathlètes et compétiteurs qui sentent qu'ils stagnent ou qui veulent optimiser leur geste. Il n'est pas nécessaire d'être un athlète élite, mais il faut savoir nager le crawl en continu."
          />
          <FAQItem
            question="Comment me filmer correctement ?"
            answer="Dès votre inscription, vous recevez un PDF gratuit détaillant exactement comment positionner la caméra (ou le téléphone) au bord du bassin, et quels angles capturer (face, profil) pour que l'analyse soit parfaite."
          />
          <FAQItem
            question="Comment se déroule la réservation ?"
            answer="Une fois le formulaire rempli, vous choisissez un créneau de 15 minutes en visio. Cet appel découverte est offert et nous permet de faire connaissance avant d'aller plus loin."
          />
          <FAQItem
            question="Sous combien de temps vais-je recevoir mon analyse ?"
            answer="Une fois vos vidéos validées, je m'engage à vous livrer l'analyse complète (vidéo, PDF, plan d'entraînement) dans un délai maximum de 72 heures."
          />
        </div>

        <div className="flex items-center justify-center gap-3 text-slate-600 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <p className="text-sm font-medium">Appel gratuit et sans engagement pour faire le point sur votre nage.</p>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-24 bg-blue-600 text-white text-center px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Votre progression ne dépend pas seulement de ce que vous nagez. <br />Elle dépend surtout de <em>comment</em> vous nagez.</h2>
        <p className="text-blue-100 text-xl mb-10">Réservez votre appel découverte gratuit aujourd'hui.</p>
        <Button onClick={() => navigate('contact')} className="bg-slate-900 text-white hover:bg-slate-800 text-lg px-10 py-4">
          Démarrer sans engagement
        </Button>
      </div>
    </section>
  </div>
);

const About = ({ navigate }) => (
  <div className="animate-fade-in pt-24 pb-20">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading subtitle="Mon Parcours" title="Qui je suis et pourquoi j'analyse la natation autrement" />

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <img src="/julien.jpg" alt="Julien Moens au bord du bassin" className="rounded-2xl shadow-xl" />
        </div>
        <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
          <h3 className="text-2xl font-bold text-slate-900">Je m'appelle Julien Moens.</h3>
          <p>
            Plongé dans l'univers de la natation depuis toujours, j'ai côtoyé la performance à haut niveau (Championnats de Wallonie, Championnats Francophones, Championnats de Belgique). Mon expérience d'athlète m'a appris une chose fondamentale : <strong>le volume seul ne fait pas la vitesse.</strong>
          </p>
          <p>
            La majorité des nageurs amateurs et triathlètes pensent que pour aller plus vite, il faut "forcer plus" ou "nager plus de kilomètres". Dans l'eau, milieu 800 fois plus dense que l'air, cette logique est destructrice. Si votre technique est mauvaise, toute votre énergie sert à brasser de l'eau, pas à avancer.
          </p>
          <p>
            C'est pourquoi j'ai développé cette méthode d'analyse : pour apporter aux passionnés l'expertise biomécanique normalement réservée à l'élite.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        <div className="bg-slate-50 p-8 rounded-2xl">
          <Trophy className="w-10 h-10 text-blue-600 mb-4" />
          <h4 className="text-xl font-bold text-slate-900 mb-3">Athlète de compétition</h4>
          <p className="text-slate-700 text-base">Des années d'expérience en bassin, validées par des médailles régionales et nationales. Je connais les exigences du chrono de l'intérieur.</p>
        </div>
        <div className="bg-slate-50 p-8 rounded-2xl">
          <Target className="w-10 h-10 text-blue-600 mb-4" />
          <h4 className="text-xl font-bold text-slate-900 mb-3">La Méthode</h4>
          <p className="text-slate-700 text-base">Je ne donne pas de "conseils vagues". J'identifie biomécaniquement les déséquilibres, les appuis fuyants et les freins qui vous coûtent du temps.</p>
        </div>
        <div className="bg-slate-50 p-8 rounded-2xl">
          <User className="w-10 h-10 text-blue-600 mb-4" />
          <h4 className="text-xl font-bold text-slate-900 mb-3">Pour qui ?</h4>
          <p className="text-slate-700 text-base">Triathlètes en quête d'économie d'énergie, nageurs maîtres ou amateurs voulant enfin glisser au lieu de lutter.</p>
        </div>
      </div>

      {/* --- SECTION PRESSE ET PALMARÈS --- */}
      <div className="mb-24">
        <SectionHeading subtitle="Palmarès & Médias" title="L'exigence du haut niveau, reconnue par la presse" centered={true} />
        <div className="flex justify-center mb-12">
          <p className="text-center text-slate-600 text-lg leading-relaxed max-w-2xl">
            Mon expertise ne s'est pas construite uniquement au bord du bassin, mais dans l'eau, face au chronomètre. Voici un aperçu de mon parcours en compétition couvert par la presse régionale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PressCard
            source="GrenzEcho"
            date="Février 2022"
            badge="Championnats Francophones"
            title="« Julien Moens décroche l'argent sur 50m papillon »"
            description="Une médaille d'argent remportée aux Championnats Francophones Open à Charleroi, validant le travail de vitesse et d'explosivité."
            image="/presse-francophones.jpg"
          />
          <PressCard
            source="GrenzEcho"
            date="Novembre 2021"
            badge="Championnats de Belgique"
            title="« Julien Moens nage quatre records personnels »"
            description="Lors des Championnats Nationaux en petit bassin à Louvain, j'ai abaissé mes chronos personnels sur chacune des distances nagées face à l'élite belge."
            image="/presse-belgique.jpg"
          />
          <PressCard
            source="GrenzEcho"
            date="Février 2020"
            badge="Championnats de Wallonie"
            title="« Julien Moens rafle quatre victoires »"
            description="Quadruple titre remporté lors des Championnats de Wallonie (grand bassin), confirmant une polyvalence technique sur plusieurs nages."
            image="/presse-wallonie.jpg"
          />
          <PressCard
            source="GrenzEcho"
            date="Novembre 2023"
            badge="Championnats de District"
            title="« Moens et ses coéquipiers nagent vers le titre »"
            description="Victoire aux championnats régionaux (Seraing), illustrant la constance de la performance au fil des saisons."
            image="/presse-district.jpg"
          />
          <PressCard
            source="GrenzEcho"
            date="Octobre 2021"
            badge="Qualifications"
            title="« Julien Moens valide son ticket pour les championnats nationaux »"
            description="Des performances réalisées en compétition permettant d'accéder aux plus hauts standards nationaux sur petit bassin."
            image="/presse-qualif.jpg"
          />
          <PressCard
            source="GrenzEcho"
            date="Juin 2023"
            badge="Eau Libre / Triathlon"
            title="« Performance solide à Bütgenbach »"
            description="Preuve d'adaptation au milieu naturel avec une belle place lors de l'événement de Bütgenbach."
            image="/presse-triathlon.png"
          />
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-3xl p-12 lg:p-16 max-w-4xl mx-auto shadow-2xl relative overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col gap-6 items-center justify-center text-center">
          <h3 className="text-3xl font-bold m-0">Ma Vision</h3>
          <p className="text-xl text-cyan-300 italic m-0">"Nager mieux, avant de nager plus."</p>
          <p className="text-slate-300 m-0 max-w-2xl mx-auto leading-relaxed">
            La performance ne vient pas seulement de la souffrance à l'entraînement, elle vient de la justesse gestuelle. Confiez-moi vos vidéos, je vous donnerai les clés techniques qui m'ont permis d'atteindre le niveau national.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Service = ({ navigate }) => (
  <div className="animate-fade-in pt-24 pb-20">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading subtitle="Détail de l'offre" title="Le programme principal" />

      {/* Contenu principal */}
      <div className="grid lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Video className="text-blue-600" /> Bilan de départ + plan d'action
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              On commence par un appel pour fixer votre objectif, puis j'analyse votre nage en vidéo pour repérer ce qui vous freine.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Vous repartez avec des corrections simples, adaptées à <strong>votre</strong> niveau et applicables dès la séance suivante.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <FileText className="text-blue-600" /> Suivi clair semaine après semaine
            </h3>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <strong className="block text-slate-900">Plan de 6 semaines personnalisé</strong>
                    <span className="text-sm text-slate-600">Vous savez exactement quoi nager, comment le faire, et dans quel ordre progresser.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <strong className="block text-slate-900">Tableau de suivi simple</strong>
                    <span className="text-sm text-slate-600">Vous suivez vos séances et vos progrès facilement, même depuis votre téléphone.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <strong className="block text-slate-900">Point chaque semaine</strong>
                    <span className="text-sm text-slate-600">On ajuste le plan ensemble pour garder le rythme et continuer à avancer.</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Pourquoi ça fonctionne ?</h3>
            <p className="text-slate-600 leading-relaxed">
              Parce que vous êtes guidé du début à la fin : un plan clair, un point chaque semaine et une réponse rapide sur WhatsApp quand vous avez un doute.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">L'Accompagnement</h3>
            <p className="text-slate-500 text-sm mb-6">Un accompagnement complet sur 6 semaines, simple et concret</p>

            <div className="text-2xl font-bold text-blue-600 mb-6">Appel de départ<br />+ suivi hebdomadaire</div>

            <ul className="space-y-3 mb-8 text-sm text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Analyse vidéo de votre nage</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Plan personnalisé sur 6 semaines</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Tableau de suivi simple</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Point hebdomadaire</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Ligne directe WhatsApp</li>
            </ul>

            <Button onClick={() => navigate('contact')} variant="accent" className="w-full mb-4 text-slate-950 font-bold">Parlons-en</Button>
            <p className="text-sm font-medium text-center text-slate-500 mt-4">L'objectif est simple : vous aider à gagner en vitesse, en aisance et en régularité, avec un accompagnement clair, humain et structuré.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Blog = ({ navigate }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setArticles([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Journal de bord" title="Conseils d'Expert & Biomécanique" />

        {/* Filtres statiques de démo */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["Tous", "Technique", "Biomécanique", "Triathlon", "Entraînement"].map((cat, i) => (
            <button key={i} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading ? (
            <p className="text-center col-span-full">Chargement des articles...</p>
          ) : articles.length === 0 ? (
            <p className="text-center col-span-full text-slate-500">Aucun article publié pour le moment. Allez sur l'admin pour en ajouter.</p>
          ) : articles.map((article, i) => (
            <article key={i} onClick={() => navigate(`article_${article.id}`)} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group cursor-pointer flex flex-col h-full">
              <div className="h-48 overflow-hidden relative shrink-0 bg-slate-100">
                {article.image && (
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-blue-600 uppercase tracking-wider shadow-sm">
                  {article.category}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-slate-400 text-xs mb-3">{new Date(article.created_at).toLocaleDateString()}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-snug">{article.title}</h3>
                <div className="mt-auto flex items-center text-blue-600 font-medium text-sm">
                  Lire l'article <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Prêt à passer de la théorie à la pratique ?</h3>
          <Button variant="outlineDark" onClick={() => navigate('contact')}>Réserver une analyse personnalisée</Button>
        </div>
      </div>
    </div>
  );
};


const Contact = ({ navigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    niveau: 'Amateur régulier',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // --- MODE TEST : Bypasse l'API pour voir directement l'écran de réservation ---
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);

    /* FIXME: À décommenter pour remettre la vraie API backend
    try {
      const res = await fetch('http://localhost:3001/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Nous n'avons pas pu envoyer l'email à cette adresse. Vérifiez-la et réessayez.");
      }
    } catch (err) {
      alert("Le service d'email est momentanément indisponible.");
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div className="animate-fade-in pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading subtitle="Passer à l'action" title="Réserver votre analyse" />

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">

          {/* Formulaire / Checkout info */}
          <div className="lg:w-3/5 p-10 lg:p-14">
            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Prendre rendez-vous</h3>
                <p className="text-slate-600 mb-8">
                  Remplissez vos informations ci-dessous. Dès l'étape suivante, vous pourrez directement réserver votre <strong>appel découverte en visio (15 min)</strong>.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Prénom</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" placeholder="Jean" value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nom</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" placeholder="Dupont" value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" placeholder="jean.dupont@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Niveau actuel (Optionnel)</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors bg-white" value={formData.niveau} onChange={e => setFormData({ ...formData, niveau: e.target.value })}>
                      <option>Amateur régulier</option>
                      <option>Triathlète</option>
                      <option>Compétiteur Eau Libre / Bassin</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Une question avant de réserver ? (Optionnel)</label>
                    <textarea rows="3" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" placeholder="Écrivez votre message ici..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full text-lg py-4 flex items-center justify-center gap-2">
                      {loading ? "Chargement en cours..." : "Suivant : Choisir mon créneau visio"} {!loading && <ArrowRight className="w-5 h-5" />}
                    </Button>
                    <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Entièrement gratuit et sans engagement.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">Parfait ! Dernière étape...</h3>
                <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto">
                  Vos informations sont enregistrées. Pour mieux comprendre vos besoins et vous présenter mon accompagnement, choisissons un moment en visio pour faire connaissance !
                </p>
                <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/5 h-[650px] mb-8 bg-white border border-slate-100">
                  <Cal
                    calLink="julien-moens-6ozkdn/coaching-natation"
                    style={{ width: "100%", height: "100%", overflow: "scroll" }}
                    config={{
                      name: `${formData.prenom} ${formData.nom}`,
                      email: formData.email,
                      layout: 'month_view'
                    }}
                  />
                </div>

                <button onClick={() => navigate('home')} className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors underline underline-offset-4">
                  Passer cette étape pour le moment (retour à l'accueil)
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:w-2/5 bg-slate-900 text-white p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

            <h3 className="text-2xl font-bold mb-8">Comment ça se passe ?</h3>

            <ul className="space-y-6 relative z-10">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-800 text-cyan-400 flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Vos coordonnées</h4>
                  <p className="text-slate-400 text-sm">Vous remplissez le formulaire pour recevoir le guide d'analyse gratuit.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-800 text-cyan-400 flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Réservation visio</h4>
                  <p className="text-slate-400 text-sm">Immédiatement après, vous choisissez un créneau offert dans mon agenda pour discuter.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-800 text-cyan-400 flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Filmez-vous</h4>
                  <p className="text-slate-400 text-sm">Lisez le PDF reçu par mail, filmez-vous et envoyez-moi vos vidéos.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-800 text-cyan-400 flex items-center justify-center font-bold shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Votre Analyse</h4>
                  <p className="text-slate-400 text-sm">Je réalise votre analyse complète et vous livre le tout sous 72h.</p>
                </div>
              </li>
            </ul>

            <div className="mt-12 pt-8 border-t border-slate-700/50 relative z-10">
              <div className="flex items-center gap-3 text-slate-300 text-sm mb-3">
                <Mail className="w-5 h-5 text-cyan-400" /> contact@eswim.com
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Je réponds généralement en moins de 24h ouvrées. L'accompagnement est 100% personnalisé.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- COMPOSANTS ADMIN ET ARTICLE ---

const Admin = ({ navigate }) => {
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Entraînement', image: '', content: '' });
  const [articles, setArticles] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [publishStatus, setPublishStatus] = useState(null);

  const fetchArticles = () => {
    // Adding a timestamp ensures the browser doesn't cache the API response!
    fetch(`http://localhost:3001/api/articles?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(data => setArticles(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (isLogged) fetchArticles();
  }, [isLogged]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') setIsLogged(true);
    else alert('Mot de passe incorrect (indice: admin123)');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishStatus({ type: 'loading', text: 'Publication en cours...' });
    try {
      const res = await fetch('http://localhost:3001/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setPublishStatus({ type: 'success', text: 'Article publié avec succès !' });
        setFormData({ title: '', category: 'Entraînement', image: '', content: '' });
        fetchArticles();
        setTimeout(() => setPublishStatus(null), 4000);
      } else {
        setPublishStatus({ type: 'error', text: 'Erreur lors de la publication.' });
        setTimeout(() => setPublishStatus(null), 4000);
      }
    } catch (err) {
      setPublishStatus({ type: 'error', text: 'Serveur indisponible.' });
      setTimeout(() => setPublishStatus(null), 4000);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        // Update local state instantly avoiding caching issues
        setArticles(prev => prev.filter(article => article.id !== id));
        setConfirmDelete(null);
      } else {
        alert('Erreur lors de la suppression coté serveur.');
      }
    } catch (err) {
      alert('Impossible de contacter le serveur pour la suppression.');
    }
  };

  if (!isLogged) {
    return (
      <div className="animate-fade-in pt-40 pb-20 max-w-sm mx-auto px-6 min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Accès Administrateur</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">Se connecter</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pt-32 pb-20 max-w-4xl mx-auto px-6">
      <SectionHeading title="Créer un nouvel article" subtitle="Espace Admin" />
      <div className="flex justify-end mb-4">
        <Button variant="secondary" onClick={() => navigate('blog')}>← Voir le Blog</Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-2xl shadow-xl border border-slate-100 text-slate-700">
        <div>
          <label className="block text-sm font-semibold mb-2">Titre de l'article</label>
          <input type="text" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:border-blue-600 outline-none" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: Devenir un meilleur nageur..." />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Catégorie</label>
            <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:border-blue-600 outline-none" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
              <option>Entraînement</option>
              <option>Technique</option>
              <option>Biomécanique</option>
              <option>Triathlon</option>
              <option>Performance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">URL de l'image (Optionnel)</label>
            <input type="url" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:border-blue-600 outline-none" placeholder="https://images.unsplash.com/..." value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Contenu HTML</label>
          <p className="text-xs text-slate-500 mb-3">Vous pouvez écrire ou coller directement vos balises HTML ici (h2, p, strong, br).</p>
          <textarea required rows="14" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:border-blue-600 outline-none font-mono text-sm bg-slate-50" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="<h2>Introduction</h2><p>Ceci est un texte en HTML.</p>"></textarea>
        </div>

        {publishStatus && (
          <div className={`p-4 rounded-lg font-medium text-sm text-center animate-fade-in ${publishStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
            publishStatus.type === 'loading' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
              'bg-red-50 text-red-700 border border-red-200'
            }`}>
            {publishStatus.type === 'success' && <CheckCircle className="w-5 h-5 inline-block mr-2" />}
            {publishStatus.text}
          </div>
        )}

        <Button type="submit" className="w-full text-lg py-4">Publier l'article</Button>
      </form>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Gérer les articles existants</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {articles.length === 0 ? (
            <p className="p-6 text-slate-500 text-center">Aucun article publié.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {articles.map(article => (
                <li key={article.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800 leading-tight">{article.title}</h4>
                    <span className="text-xs text-slate-400 font-medium mt-1 inline-block">{new Date(article.created_at).toLocaleDateString()} — {article.category}</span>
                  </div>
                  <div className="flex items-center shrink-0 min-w-[200px] justify-end">
                    {confirmDelete === article.id ? (
                      <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg border border-red-100 animate-fade-in shadow-sm">
                        <span className="text-xs font-semibold text-red-800 mr-2">Confirmer ?</span>
                        <button type="button" onClick={() => handleDelete(article.id)} className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded shadow-sm hover:bg-red-700 transition-colors">Oui</button>
                        <button type="button" onClick={() => setConfirmDelete(null)} className="px-3 py-1 bg-white text-slate-600 text-xs font-bold rounded shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">Non</button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setConfirmDelete(article.id)} className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const ArticleDetail = ({ navigate, id }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/articles/${id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="pt-40 text-center min-h-screen text-slate-500">Chargement de l'article...</div>;
  if (!article || article.error) return <div className="pt-40 text-center min-h-screen text-slate-500">Article introuvable ou erreur de serveur.</div>;

  return (
    <div className="animate-fade-in pt-32 pb-32 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={() => navigate('blog')} className="text-slate-500 hover:text-blue-600 font-medium mb-10 flex items-center transition-colors">
          <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Retour aux articles
        </button>
        <div className="mb-10 text-center">
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full mb-6">{article.category}</span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">{article.title}</h1>
          <p className="text-slate-400 text-sm mt-6 font-medium">Publié le {new Date(article.created_at).toLocaleDateString()}</p>
        </div>
        {article.image && (
          <div className="mb-14 rounded-3xl overflow-hidden shadow-lg h-64 md:h-[400px]">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div
          className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
      </div>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL (ROUTER & LAYOUT) ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'Mon Expertise' },
    { id: 'service', label: 'Analyse Biomécanique' },
    { id: 'blog', label: 'Blog' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-cyan-200 selection:text-slate-900 text-slate-800">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-slate-950/80 text-white backdrop-blur-xl z-50 border-b border-white/5 transition-all shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <button
            type="button"
            className="cursor-pointer flex items-center gap-2 sm:gap-3 group"
            onClick={() => setCurrentPage('home')}
            aria-label="Retour à l'accueil"
          >
            <EswimLogo className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-500 group-hover:text-white transition-colors duration-300" />
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">ESWIM<span className="text-cyan-500">.</span></span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-sm font-semibold py-2 relative transition-colors group ${currentPage === link.id ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                  }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform origin-left transition-transform duration-300 ${currentPage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setCurrentPage('contact')}
              variant="primary"
              className="hidden md:flex text-sm py-2.5 px-5"
            >
              Réserver mon analyse
            </Button>

            <button
              className="md:hidden p-2 text-white rounded-lg border border-slate-700 bg-slate-900/60"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <>
            <button
              type="button"
              className="md:hidden fixed inset-0 top-20 bg-black/55 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Fermer le menu mobile"
            />
            <div className="md:hidden fixed top-20 left-0 right-0 z-50 bg-slate-950 border-b border-slate-800 p-4 animate-fade-in shadow-2xl text-white max-h-[calc(100vh-5rem)] overflow-y-auto">
              <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`text-left text-base font-semibold px-3 py-3 rounded-lg transition-colors ${currentPage === link.id ? 'text-slate-950 bg-cyan-400' : 'text-slate-100 bg-slate-900 hover:bg-slate-800'
                    }`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => setCurrentPage('contact')}
                className="w-full mt-3 py-3"
              >
                Parlons-en
              </Button>
            </div>
            </div>
          </>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow pt-20">
        {currentPage === 'home' && <Home navigate={setCurrentPage} />}
        {currentPage === 'about' && <About navigate={setCurrentPage} />}
        {currentPage === 'service' && <Service navigate={setCurrentPage} />}
        {currentPage === 'blog' && <Blog navigate={setCurrentPage} />}
        {currentPage === 'contact' && <Contact navigate={setCurrentPage} />}
        {currentPage === 'admin' && <Admin navigate={setCurrentPage} />}
        {currentPage.startsWith('article_') && <ArticleDetail navigate={setCurrentPage} id={currentPage.split('_')[1]} />}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">

          <div className="md:col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <EswimLogo className="w-12 h-12 text-blue-500" />
              <span className="text-2xl font-black tracking-tight text-white">ESWIM<span className="text-blue-500">.</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              L'expertise biomécanique pour les nageurs exigeants. Transformez votre technique, explosez vos chronos.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-cyan-400 transition-colors">Accueil</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-cyan-400 transition-colors">Mon Expertise</button></li>
              <li><button onClick={() => setCurrentPage('service')} className="hover:text-cyan-400 transition-colors">Le Service</button></li>
              <li><button onClick={() => setCurrentPage('blog')} className="hover:text-cyan-400 transition-colors">Blog & Conseils</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Légal</h4>
            <ul className="space-y-3 text-sm">
              <li><button className="hover:text-white transition-colors">Mentions légales</button></li>
              <li><button className="hover:text-white transition-colors">Politique de confidentialité</button></li>
              <li><button className="hover:text-white transition-colors">CGV</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contact</h4>
            <p className="text-sm mb-4">Une question technique avant de vous lancer ?</p>
            <a href="mailto:contact@eswim.com" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-2 mb-6">
              <Mail className="w-4 h-4" /> contact@eswim.com
            </a>
            <Button onClick={() => setCurrentPage('contact')} variant="primary" className="w-full text-sm py-2">
              Démarrer sans risque
            </Button>
          </div>

        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900 text-center text-xs text-slate-500 relative">
          © {new Date().getFullYear()} <span onClick={() => setCurrentPage('admin')} className="cursor-pointer hover:text-slate-400 transition-colors">Julien Moens</span> - Eswim. Tous droits réservés. Développé pour la performance.
        </div>
      </footer>

      {/* Global simple animations styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}} />
    </div>
  );
}
