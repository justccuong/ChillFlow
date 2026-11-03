import React, { useState, useEffect } from 'react';
import {
  X,
  FolderKanban,
  ExternalLink,
  Copy,
  Trash2,
  Edit,
  Cloud,
  CheckCircle2,
  Sparkles,
  Calendar,
} from 'lucide-react';
import {
  getAllSavedProjects,
  cloneProject,
  deleteProject,
  PROJECTS_CHANGE_EVENT,
  type SavedProject,
} from '../services/projectStorageService';
import { syncProjectsToCloud, getCloudSyncStatus } from '../services/supabaseService';
import type { UserProfile } from '../types';

interface MyProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: SavedProject) => void;
  onNewProject: () => void;
  userProfile?: UserProfile;
}

export const MyProjectsModal: React.FC<MyProjectsModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onNewProject,
  userProfile,
}) => {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setProjects(getAllSavedProjects());

    const handleProjectsChanged = () => {
      setProjects(getAllSavedProjects());
    };

    window.addEventListener(PROJECTS_CHANGE_EVENT, handleProjectsChanged);
    return () => {
      window.removeEventListener(PROJECTS_CHANGE_EVENT, handleProjectsChanged);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const cloudStatus = getCloudSyncStatus();

  const handleClone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    cloneProject(id);
    setProjects(getAllSavedProjects());
  };

  const handleDelete = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Bạn có chắc muốn xóa landing page "${name}"?`)) {
      deleteProject(id);
      setProjects(getAllSavedProjects());
    }
  };

  const handleCloudSync = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const result = await syncProjectsToCloud(userProfile?.id || 'guest', projects);
      setSyncFeedback(result.message);
    } catch {
      setSyncFeedback('Đã lưu cục bộ an toàn trên trình duyệt.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="my-projects-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <h3 id="my-projects-title" className="text-lg font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                Dự án của tôi
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {projects.length} trang
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lưu trữ Local-First không cần đăng nhập • Tùy chọn đồng bộ Cloud Supabase
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cloud Sync Status Banner */}
        <div className="px-6 py-3 bg-slate-100/60 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>
              {cloudStatus.isConfigured
                ? 'Đã kết nối Supabase BaaS'
                : 'Chế độ Local-First (Bảo mật tối đa, 0ms)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCloudSync}
              disabled={isSyncing || projects.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-semibold border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>{isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ Cloud'}</span>
            </button>
          </div>
        </div>

        {syncFeedback && (
          <div className="px-6 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{syncFeedback}</span>
          </div>
        )}

        {/* Project List */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {projects.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <FolderKanban className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Chưa có landing page nào được lưu
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Khi bạn tạo trang sự kiện đầu tiên, trang sẽ tự động lưu trữ tại đây để bạn có thể xem lại và chỉnh sửa bất cứ lúc nào.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNewProject();
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
              >
                Tạo trang mới ngay
              </button>
            </div>
          ) : (
            projects.map((proj) => {
              const updatedAtStr = new Date(proj.updatedAt).toLocaleString('vi-VN', {
                dateStyle: 'short',
                timeStyle: 'short',
              });

              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj);
                    onClose();
                  }}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                        {proj.name}
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {proj.category}
                      </span>
                      {proj.cro?.totalScore && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> CRO {proj.cro.totalScore}/100
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {updatedAtStr}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-[11px] truncate max-w-xs">/p/{proj.slug}</span>
                      <span>•</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400">
                        ID: {proj.id}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectProject(proj);
                        onClose();
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                      title="Mở chỉnh sửa"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Mở</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleClone(proj.id, e)}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      title="Nhân bản (Clone)"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <a
                      href={`#/p/${proj.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      title="Xem trang công khai"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={(e) => handleDelete(proj.id, proj.name, e)}
                      className="p-1.5 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onNewProject();
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
          >
            + Tạo trang mới
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-md"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
export default MyProjectsModal;
