/**
 * Create by Zwl on 2019/4/19
 * @Description:
 */

export const setStore = (name, content) =>{
  if(!name) return;
  if(typeof content !== 'string'){
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

export const getStore = (name) =>{
  if(!name) return;

  return window.localStorage.getItem(name);
}
