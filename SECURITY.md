# TaskTimer | SEGURANÇA

## Navegação

- [Tarefas](TODO.md)
- [Readme](README.md)
- [Modelagem](MODELING.md)
- [Desempenho](PERFORMANCE.md)

## Lista de verificação: recomendações

Etapas seguidas para melhorar a segurança do aplicativo:

1.  [Carregar apenas conteúdo seguro](https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content)
2.  [Desative a integração do Node.js em todos os renderizadores que exibem conteúdo remoto](https://www.electronjs.org/docs/latest/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content)
3.  [Habilitar isolamento de contexto em todos os renderizadores](https://www.electronjs.org/docs/latest/tutorial/security#3-enable-context-isolation)
4.  [Habilitar processo de sandbox](https://www.electronjs.org/docs/latest/tutorial/security#4-enable-process-sandboxing)
5.  [Use `ses.setPermissionRequestHandler()` em todas as sessões que carregam conteúdo remoto](https://www.electronjs.org/docs/latest/tutorial/security#5-handle-session-permission-requests-from-remote-content)
6.  [Não desative o `webSecurity`](https://www.electronjs.org/docs/latest/tutorial/security#6-do-not-disable-websecurity)
7.  [Defina um `Content-Security-Policy` e use regras restritivas (ou seja `script-src` `'self'`, )](https://www.electronjs.org/docs/latest/tutorial/security#7-define-a-content-security-policy)
8.  [Não habilite `allowRunningInsecureContent`](https://www.electronjs.org/docs/latest/tutorial/security#8-do-not-enable-allowrunninginsecurecontent)
9.  [Não ative recursos experimentais](https://www.electronjs.org/docs/latest/tutorial/security#9-do-not-enable-experimental-features)
10. [Não use `enableBlinkFeatures`](https://www.electronjs.org/docs/latest/tutorial/security#10-do-not-use-enableblinkfeatures)
11. [`<webview>`: Não use `allowpopups`](https://www.electronjs.org/docs/latest/tutorial/security#11-do-not-use-allowpopups-for-webviews)
12. [`<webview>`: Verifique opções e parâmetros](https://www.electronjs.org/docs/latest/tutorial/security#12-verify-webview-options-before-creation)
13. [Desativar ou limitar a navegação](https://www.electronjs.org/docs/latest/tutorial/security#13-disable-or-limit-navigation)
14. [Desativar ou limitar a criação de novas janelas](https://www.electronjs.org/docs/latest/tutorial/security#14-disable-or-limit-creation-of-new-windows)
15. [Não use `shell.openExternal` com conteúdo não confiável](https://www.electronjs.org/docs/latest/tutorial/security#15-do-not-use-shellopenexternal-with-untrusted-content)
16. [Use uma versão atual do Electron](https://www.electronjs.org/docs/latest/tutorial/security#16-use-a-current-version-of-electron)
17. [Validar `sender` todas as mensagens IPC](https://www.electronjs.org/docs/latest/tutorial/security#17-validate-the-sender-of-all-ipc-messages)
