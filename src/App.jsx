import React, { useState, useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";
import {
  Menu, X, ChevronDown, CheckCircle, ArrowRight, Video, FileText,
  Calendar, Activity, Droplets, Target, User, Mail, Camera,
  Award, Clock, ShieldCheck, ChevronRight, Trophy, Newspaper, Trash2
} from 'lucide-react';

// --- COMPOSANTS REUTILISABLES ---

const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300";
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:border-blue-600 hover:text-blue-600",
    outlineDark: "border border-white/20 text-white hover:bg-white/10 hover:text-white",
    accent: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg hover:shadow-cyan-400/30"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    {subtitle && <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-3 block">{subtitle}</span>}
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h2>
    <div className={`w-20 h-1 bg-cyan-500 rounded-full ${centered ? 'mx-auto' : ''}`}></div>
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
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group flex flex-col h-full">
    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 group-hover:bg-cyan-400 transition-colors z-10"></div>

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

// --- PAGES ---

const Home = ({ navigate }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <section className="relative bg-slate-900 text-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <img src="https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Nageur sous l'eau" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30 text-cyan-400 text-sm font-medium mb-6">
            <Activity className="w-4 h-4" /> Analyse Biomécanique Premium
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-snug mb-8">
            Nagez plus vite. <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Fatiguez-vous moins.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
            L'analyse biomécanique vidéo et le plan d'entraînement sur-mesure pour exploser vos chronos. Arrêtez de nager plus pour stagner, corrigez ce qui vous freine vraiment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => navigate('contact')} className="text-lg px-8 py-4">
              Commencer mon analyse
            </Button>
            <Button variant="outlineDark" onClick={() => navigate('service')} className="text-lg px-8 py-4">
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
          title="Le Pack Analyse Biomécanique & Correction"
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Video className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Analyse vidéo détaillée</h3>
            <p className="text-slate-700 text-base leading-relaxed">
              Vous vous filmez, j'analyse votre nage au ralenti avec des tracés. J'identifie vos freins : alignement, respiration, prise d'appui, coordination et efficacité propulsive.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">2. Fiche bilan PDF</h3>
            <p className="text-slate-700 text-base leading-relaxed">
              Un document clair, synthétique et visuel résumant les défauts observés, les priorités de correction et les points-clés à retenir avant chaque séance.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Plan sur 4 semaines</h3>
            <p className="text-slate-700 text-base leading-relaxed">
              Un programme précis avec éducatifs, exercices ciblés et logique de progression pour automatiser une nage plus efficace et détruire vos anciens défauts.
            </p>
          </div>
        </div>

        <div className="text-center bg-slate-900 text-white rounded-2xl p-10 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <h3 className="text-3xl font-bold mb-6 relative z-10">Prêt à transformer votre nage ?</h3>
          <p className="text-slate-300 mb-10 text-sm relative z-10">Réservez dès maintenant votre appel découverte offert pour que nous discutions de vos objectifs.</p>
          <Button onClick={() => navigate('contact')} className="w-full sm:w-auto text-lg px-10 py-4 relative z-10">
            Obtenir le guide & réserver ma visio
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
          <img src="https://images.unsplash.com/photo-1550517558-8120b08053ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Julien Moens au bord du bassin" className="rounded-2xl shadow-xl" />
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
      <SectionHeading subtitle="Détail de l'offre" title="L'Analyse Biomécanique Complète" />

      {/* Contenu principal */}
      <div className="grid lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Video className="text-blue-600" /> Ce que comprend le retour vidéo
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Je vous renvoie votre propre vidéo, éditée et commentée de vive voix. J'y ajoute des arrêts sur image, des ralentis et des tracés graphiques (lignes d'alignement, angles d'attaque, vecteurs de force) pour vous montrer très concrètement ce qui se passe sous l'eau.
            </p>
            <p className="text-slate-600 leading-relaxed">
              La différence avec une simple vidéo YouTube ? Ici, on parle de <strong>votre</strong> corps, de <strong>vos</strong> défauts et de la manière dont <strong>vos</strong> segments interagissent.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <FileText className="text-blue-600" /> Le Bilan PDF et le Plan
            </h3>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <strong className="block text-slate-900">Diagnostic précis</strong>
                    <span className="text-sm text-slate-600">Liste hiérarchisée des 3 défauts majeurs à corriger en priorité.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <strong className="block text-slate-900">Plan de 4 semaines</strong>
                    <span className="text-sm text-slate-600">4 blocs d'entraînement spécifiques avec des éducatifs détaillés pour reprogrammer votre schéma moteur.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <strong className="block text-slate-900">Points de focus</strong>
                    <span className="text-sm text-slate-600">Les sensations clés à rechercher lors de vos prochaines séances.</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Pourquoi ça fonctionne ?</h3>
            <p className="text-slate-600 leading-relaxed">
              Le nageur ne repart pas seulement avec un diagnostic froid ("ton coude est trop bas"), mais avec une <strong>méthode concrète</strong> pour corriger le problème. Je vous explique le "pourquoi" et je vous donne le "comment". C'est cette pédagogie couplée à un plan d'action qui crée de vrais résultats sur le chronomètre.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">L'Accompagnement</h3>
            <p className="text-slate-500 text-sm mb-6">Déroulement de l'analyse premium à distance</p>

            <div className="text-2xl font-bold text-blue-600 mb-6">Appel Découverte<br />Offert (15 min)</div>

            <ul className="space-y-3 mb-8 text-sm text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Echange visio offert</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Guide de captation fourni</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Analyse biomécanique complète</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Fiche Bilan PDF</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> Plan correctif 4 semaines</li>
            </ul>

            <Button onClick={() => navigate('contact')} variant="accent" className="w-full mb-4 text-slate-950 font-bold">Réserver mon appel</Button>
            <p className="text-sm font-medium text-center text-slate-500 mt-4">Entièrement sans engagement.</p>
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
          <div className="mb-14 rounded-3xl overflow-hidden shadow-lg h-[400px]">
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

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'Mon Expertise' },
    { id: 'service', label: 'Analyse Biomécanique' },
    { id: 'blog', label: 'Blog' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-cyan-200 selection:text-slate-900 text-slate-800">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-slate-950/95 text-white backdrop-blur-md z-50 border-b border-slate-800 transition-all shadow-slate-950/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              E<span className="text-blue-500 font-black">swim</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-sm font-medium py-1 transition-colors border-b-2 ${currentPage === link.id ? 'text-cyan-400 border-cyan-400' : 'text-slate-300 border-transparent hover:text-white hover:border-slate-300'
                  }`}
              >
                {link.label}
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
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 animate-fade-in shadow-2xl absolute w-full text-white">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`text-left text-lg font-medium p-2 rounded-lg ${currentPage === link.id ? 'text-blue-600 bg-blue-50' : 'text-slate-600'
                    }`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => setCurrentPage('contact')}
                className="w-full mt-4 py-3"
              >
                Réserver mon analyse
              </Button>
            </div>
          </div>
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
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Activity className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Eswim</span>
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
