import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Search,
  Home,
  User,
  FolderGit2,
  Briefcase,
  BookOpen,
  Mail,
  Copy,
  FileText,
  PhoneCall,
  ArrowUpRight,
  Folder,
} from "lucide-react";
import { projects } from "../data/projects";
import { blogs } from "../data/blogs";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const down = (e) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("openCommandMenu", handleCustomOpen);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("openCommandMenu", handleCustomOpen);
    };
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("aafaquebuisness@gmail.com");
    toast.success("Email copied to clipboard!", {
      description: "aafaquebuisness@gmail.com",
    });
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      overlayClassName="cmdk-dialog-overlay"
      contentClassName="cmdk-dialog-content"
    >
      <div className="flex items-center px-4 border-b border-white/10 bg-zinc-950/90">
        <Search className="w-4 h-4 text-zinc-500 mr-3 shrink-0" />
        <Command.Input
          placeholder="Search pages, projects, guides, or actions..."
          className="w-full bg-transparent py-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none font-sans"
        />
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <kbd className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>
      </div>

      <Command.List className="max-h-[360px] overflow-y-auto p-2 scrollbar-thin">
        <Command.Empty className="py-8 text-center text-xs text-zinc-500 font-mono">
          No matching results found.
        </Command.Empty>

        {/* Quick Actions */}
        <Command.Group heading="Quick Actions" className="px-1 py-1">
          <Command.Item
            onSelect={() => runCommand(copyEmail)}
            className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
          >
            <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
              <Copy className="w-3.5 h-3.5" />
            </div>
            <span className="flex-grow font-sans font-normal normal-case">Copy Email Address</span>
            <span className="text-[11px] font-mono text-zinc-500">aafaquebuisness@gmail.com</span>
          </Command.Item>

          <Command.Item
            onSelect={() => runCommand(() => window.open("/Aafaque_Nazir_Resume.pdf", "_blank"))}
            className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
          >
            <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span className="flex-grow font-sans font-normal normal-case">View Resume PDF</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          </Command.Item>

          <Command.Item
            onSelect={() => runCommand(() => window.open("https://wa.me/919325629256", "_blank"))}
            className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
          >
            <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <span className="flex-grow font-sans font-normal normal-case">Message on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          </Command.Item>
        </Command.Group>

        {/* Navigation */}
        <Command.Group heading="Navigation" className="px-1 py-1 mt-1 border-t border-white/5 pt-1">
          <Command.Item
            onSelect={() => runCommand(() => navigate("/"))}
            className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
          >
            <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
              <Home className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans font-normal normal-case">Home</span>
          </Command.Item>

          <Command.Item
            onSelect={() => runCommand(() => navigate("/about"))}
            className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
          >
            <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans font-normal normal-case">About Me</span>
          </Command.Item>

          <Command.Item
            onSelect={() => runCommand(() => navigate("/projects"))}
            className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
          >
            <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans font-normal normal-case">All Projects</span>
          </Command.Item>

          <Command.Item
            onSelect={() => runCommand(() => navigate("/services"))}
            className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
          >
            <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans font-normal normal-case">Services &amp; Pricing</span>
          </Command.Item>

          <Command.Item
            onSelect={() => runCommand(() => navigate("/blog"))}
            className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
          >
            <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans font-normal normal-case">Engineering Blog</span>
          </Command.Item>

          <Command.Item
            onSelect={() => runCommand(() => navigate("/contact"))}
            className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
          >
            <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans font-normal normal-case">Get in Touch</span>
          </Command.Item>
        </Command.Group>

        {/* Client Projects */}
        <Command.Group heading="Client Projects" className="px-1 py-1 mt-1 border-t border-white/5 pt-1">
          {projects.map((p) => (
            <Command.Item
              key={p.id}
              onSelect={() => runCommand(() => navigate(`/projects/${p.id}`))}
              className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
            >
              <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
                <Folder className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0 flex-grow">
                <span className="font-medium text-sm text-zinc-200 font-sans normal-case truncate">
                  {p.title}
                </span>
                <span className="text-[11px] text-zinc-500 font-sans normal-case truncate">
                  {p.category}
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 shrink-0 transition-colors" />
            </Command.Item>
          ))}
        </Command.Group>

        {/* Engineering Articles */}
        <Command.Group heading="Engineering Guides" className="px-1 py-1 mt-1 border-t border-white/5 pt-1">
          {blogs.slice(0, 5).map((b) => (
            <Command.Item
              key={b.slug}
              onSelect={() => runCommand(() => navigate(`/blog/${b.slug}`))}
              className="group flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white"
            >
              <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-200">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0 flex-grow">
                <span className="font-medium text-sm text-zinc-200 font-sans normal-case truncate">
                  {b.title}
                </span>
                <span className="text-[11px] text-zinc-500 font-sans normal-case">
                  {b.readTime}
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 shrink-0 transition-colors" />
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 bg-zinc-950 text-[11px] text-zinc-500 font-mono">
        <span>Press <kbd className="text-zinc-400">↑</kbd> <kbd className="text-zinc-400">↓</kbd> to navigate</span>
        <span><kbd className="text-zinc-400">↵</kbd> to open</span>
      </div>
    </Command.Dialog>
  );
}
