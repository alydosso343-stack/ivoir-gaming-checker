'use client'

import { motion } from 'framer-motion'
import { Cpu, Flame, ShieldCheck } from 'lucide-react'

export default function AboutVision() {
  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-b from-gray-900 to-black border border-green-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            Notre Mission 🇨🇮
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">
            Pourquoi avoir créé <span className="text-green-500">Ivoir Gaming Checker</span> ?
          </h2>
          <p className="text-gray-400 mt-3 text-sm leading-relaxed">
            Éviter aux gamers et étudiants en Côte d&apos;Ivoire d&apos;acheter ou télécharger des jeux lourds
            incompatibles avec leurs ordinateurs portables ou configurations reconditionnées.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -5 }} className="bg-gray-800/40 border border-gray-700/50 p-6 rounded-2xl">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl w-fit text-amber-400 mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Puces Intégrées (Intel HD/UHD)</h3>
            <p className="text-xs text-gray-400">
              Des algorithmes calibrés spécialement sur les processeurs bureautiques très répandus à Abidjan.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-gray-800/40 border border-gray-700/50 p-6 rounded-2xl">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl w-fit text-green-400 mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Intelligence Artificielle Groq</h3>
            <p className="text-xs text-gray-400">
              Analyse prédictive instantanée par Llama 3 quand le benchmark exact n&apos;existe pas encore dans la BDD.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-gray-800/40 border border-gray-700/50 p-6 rounded-2xl">
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl w-fit text-blue-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Gain de Temps & Data</h3>
            <p className="text-xs text-gray-400">
              Sachez immédiatement si votre jeu tournera à 30 ou 60 FPS avant de consommer votre forfait internet.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}