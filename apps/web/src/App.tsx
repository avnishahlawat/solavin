import React, { useState, useEffect } from 'react';
import { useSocket } from './hooks/useSocket';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { CreateGameModal } from './components/CreateGameModal';
import { JoinGameModal } from './components/JoinGameModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { LobbyView } from './components/LobbyView';
import { GameTableView } from './components/GameTableView';
import { GameCompleteModal } from './components/GameCompleteModal';
import { WinnerCelebration } from './components/WinnerCelebration';

export function App() {
  const {
    isConnected,
    publicState,
    privateState,
    isPassing,
    activeCelebration,
    toast,
    createRoom,
    joinRoom,
    updateSettings,
    startGame,
    passCard,
    restartGame,
    leaveRoom
  } = useSocket();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [urlRoomCode, setUrlRoomCode] = useState('');

  // Check URL query parameters for invite link: ?room=K7P4QX
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam && !publicState) {
      setUrlRoomCode(roomParam.toUpperCase());
      setIsJoinOpen(true);
    }
  }, [publicState]);

  const currentPlayerId = privateState?.player.id || '';
  const isHost = publicState?.hostId === currentPlayerId;

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 ${
              toast.type === 'error'
                ? 'bg-rose-950/80 border-rose-500/50 text-rose-200'
                : toast.type === 'warning'
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-200'
                : toast.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : 'bg-surface-100/90 border-card-border text-slate-200'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Winner Celebration Banner */}
      {activeCelebration && (
        <WinnerCelebration
          winner={activeCelebration}
          isCurrentPlayer={activeCelebration.playerId === currentPlayerId}
        />
      )}

      {/* Navigation Header */}
      <Header
        roomCode={publicState?.roomCode}
        isConnected={isConnected}
        onOpenHelp={() => setIsHelpOpen(true)}
        onLeaveRoom={publicState ? leaveRoom : undefined}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {!publicState ? (
          /* Landing Screen */
          <LandingPage
            onCreateClick={() => setIsCreateOpen(true)}
            onJoinClick={() => setIsJoinOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        ) : publicState.phase === 'LOBBY' ? (
          /* 4-Player Lobby */
          <LobbyView
            state={publicState}
            currentPlayerId={currentPlayerId}
            onStartGame={startGame}
            onChangeTheme={() => setIsCreateOpen(true)}
            onUpdateTimer={(sec) => updateSettings({ turnTimerSeconds: sec })}
          />
        ) : (
          /* Active Game Table (or Game Complete) */
          <GameTableView
            publicState={publicState}
            privateState={privateState || undefined}
            isPassing={isPassing}
            onPassCard={passCard}
          />
        )}
      </main>

      {/* Game Complete Modal Overlay */}
      {publicState?.phase === 'GAME_COMPLETE' && (
        <GameCompleteModal
          winners={publicState.winners}
          theme={publicState.theme}
          isHost={isHost}
          onRestart={restartGame}
          onHome={leaveRoom}
        />
      )}

      {/* Create Game Modal */}
      <CreateGameModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={async (playerName, themeId, customTheme, turnTimerSeconds) => {
          if (publicState && isHost) {
            updateSettings({ themeId, customTheme, turnTimerSeconds });
            return { success: true };
          }
          return await createRoom(playerName, themeId, customTheme, turnTimerSeconds);
        }}
      />

      {/* Join Game Modal */}
      <JoinGameModal
        isOpen={isJoinOpen}
        initialRoomCode={urlRoomCode}
        onClose={() => setIsJoinOpen(false)}
        onJoin={joinRoom}
      />

      {/* How to Play Modal */}
      <HowToPlayModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Footer */}
      <footer className="w-full border-t border-surface-50/40 py-3 px-4 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto">
        <div>
          <span>SOLAVIN — Modern 16 Parchi Card Game</span>
        </div>
        <div className="flex items-center gap-4 mt-1 sm:mt-0">
          <span>Turn-Based Real-Time Engine</span>
          <span>•</span>
          <button
            onClick={() => setIsHelpOpen(true)}
            className="hover:text-slate-300 transition-colors"
          >
            Rules & Strategy
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
