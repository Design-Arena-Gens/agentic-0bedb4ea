'use client';

import { useState, useEffect } from 'react';
import { Play, Instagram, Youtube, TrendingUp, Zap, Calendar, Settings, CheckCircle } from 'lucide-react';

export default function Home() {
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    youtubeVideos: 0,
    instagramReels: 0,
    lastPost: null as string | null,
  });
  const [config, setConfig] = useState({
    niche: 'technology,motivation,finance',
    frequency: '24',
    autoPost: false,
  });

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const generateContent = async () => {
    setStatus('generating');
    addLog('🤖 Starting AI content generation...');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: config.niche }),
      });

      const data = await res.json();

      if (res.ok) {
        addLog(`✅ Content generated: ${data.title}`);
        addLog(`📝 Script: ${data.script.substring(0, 100)}...`);
        setStatus('idle');
        fetchStats();
      } else {
        addLog(`❌ Error: ${data.error}`);
        setStatus('error');
      }
    } catch (error) {
      addLog(`❌ Failed to generate content: ${error}`);
      setStatus('error');
    }
  };

  const createVideo = async () => {
    setStatus('creating');
    addLog('🎬 Creating video content...');

    try {
      const res = await fetch('/api/create-video', {
        method: 'POST',
      });

      const data = await res.json();

      if (res.ok) {
        addLog(`✅ Video created successfully!`);
        addLog(`📹 Duration: ${data.duration}s`);
        setStatus('idle');
        fetchStats();
      } else {
        addLog(`❌ Error: ${data.error}`);
        setStatus('error');
      }
    } catch (error) {
      addLog(`❌ Failed to create video: ${error}`);
      setStatus('error');
    }
  };

  const postToYouTube = async () => {
    setStatus('posting');
    addLog('📤 Posting to YouTube...');

    try {
      const res = await fetch('/api/post-youtube', {
        method: 'POST',
      });

      const data = await res.json();

      if (res.ok) {
        addLog(`✅ Posted to YouTube successfully!`);
        addLog(`🔗 Video URL: ${data.url}`);
        setStatus('idle');
        fetchStats();
      } else {
        addLog(`❌ Error: ${data.error}`);
        setStatus('error');
      }
    } catch (error) {
      addLog(`❌ Failed to post to YouTube: ${error}`);
      setStatus('error');
    }
  };

  const postToInstagram = async () => {
    setStatus('posting');
    addLog('📤 Posting to Instagram...');

    try {
      const res = await fetch('/api/post-instagram', {
        method: 'POST',
      });

      const data = await res.json();

      if (res.ok) {
        addLog(`✅ Posted to Instagram successfully!`);
        setStatus('idle');
        fetchStats();
      } else {
        addLog(`❌ Error: ${data.error}`);
        setStatus('error');
      }
    } catch (error) {
      addLog(`❌ Failed to post to Instagram: ${error}`);
      setStatus('error');
    }
  };

  const runFullAutomation = async () => {
    setStatus('running');
    addLog('🚀 Starting full automation pipeline...');

    try {
      const res = await fetch('/api/automate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: config.niche }),
      });

      const data = await res.json();

      if (res.ok) {
        addLog(`✅ Full automation completed!`);
        addLog(`📊 ${data.message}`);
        setStatus('idle');
        fetchStats();
      } else {
        addLog(`❌ Error: ${data.error}`);
        setStatus('error');
      }
    } catch (error) {
      addLog(`❌ Automation failed: ${error}`);
      setStatus('error');
    }
  };

  const toggleAutoPost = async () => {
    const newValue = !config.autoPost;
    setConfig({ ...config, autoPost: newValue });

    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoPost: newValue, frequency: config.frequency }),
      });

      addLog(`${newValue ? '✅ Enabled' : '⏸️ Disabled'} automatic posting`);
    } catch (error) {
      addLog(`❌ Failed to update config: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-600">
              AI Content Agent
            </h1>
          </div>
          <p className="text-xl text-gray-300">Automatic YouTube & Instagram Content Creation</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Total Posts</h3>
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-4xl font-bold">{stats.totalPosts}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">YouTube Videos</h3>
              <Youtube className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-4xl font-bold">{stats.youtubeVideos}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Instagram Reels</h3>
              <Instagram className="w-6 h-6 text-pink-500" />
            </div>
            <p className="text-4xl font-bold">{stats.instagramReels}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 mr-2 text-blue-400" />
              <h2 className="text-2xl font-bold">Configuration</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Content Niches</label>
                <input
                  type="text"
                  value={config.niche}
                  onChange={(e) => setConfig({ ...config, niche: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="technology,motivation,finance"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Post Frequency (hours)</label>
                <input
                  type="number"
                  value={config.frequency}
                  onChange={(e) => setConfig({ ...config, frequency: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="24"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Automatic Posting</span>
                <button
                  onClick={toggleAutoPost}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    config.autoPost ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      config.autoPost ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 mr-2 text-yellow-400" />
              <h2 className="text-2xl font-bold">Quick Actions</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={generateContent}
                disabled={status !== 'idle'}
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-4 py-3 font-semibold transition-all flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Generate
              </button>

              <button
                onClick={createVideo}
                disabled={status !== 'idle'}
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-4 py-3 font-semibold transition-all flex items-center justify-center"
              >
                🎬 Create Video
              </button>

              <button
                onClick={postToYouTube}
                disabled={status !== 'idle'}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-4 py-3 font-semibold transition-all flex items-center justify-center"
              >
                <Youtube className="w-4 h-4 mr-2" />
                YouTube
              </button>

              <button
                onClick={postToInstagram}
                disabled={status !== 'idle'}
                className="bg-gradient-to-r from-pink-600 to-pink-800 hover:from-pink-700 hover:to-pink-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-4 py-3 font-semibold transition-all flex items-center justify-center"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </button>
            </div>

            <button
              onClick={runFullAutomation}
              disabled={status !== 'idle'}
              className="w-full mt-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-6 py-4 font-bold text-lg transition-all flex items-center justify-center"
            >
              <Zap className="w-5 h-5 mr-2" />
              Run Full Automation
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            Activity Log
          </h2>
          <div className="bg-black/30 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-gray-400">No activity yet. Click a button to start!</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="mb-1 text-gray-300">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {status !== 'idle' && (
          <div className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            {status === 'generating' && 'Generating content...'}
            {status === 'creating' && 'Creating video...'}
            {status === 'posting' && 'Posting content...'}
            {status === 'running' && 'Running automation...'}
          </div>
        )}
      </div>
    </div>
  );
}
