import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class IpcService {
  private ipc: IpcRenderer | undefined;

  constructor() {
    try {
      this.ipc = window.require('electron').ipcRenderer;
    } catch (e) {
      throw e;
    }
  }

  public on(
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.on(channel, listener);
  }

  public send(channel: string, ...args: any): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.send(channel, ...args);
  }
}
