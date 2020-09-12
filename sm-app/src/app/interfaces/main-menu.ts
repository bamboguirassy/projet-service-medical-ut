export interface IMenuItem {
  title: string,
  icon?: IMenuItemIcon,
  color?: string,
  active?: boolean,
  disabled?: boolean,
  groupTitle?: boolean,
  routing?: string,
  externalLink?: string,
  layout?: string;
  sub?: IMenuItemSub[],
  badge?: IMenuItemBadge,
  enabled: boolean,
}

export interface IMenuItemIcon {
  class?: string,
  color?: string,
  bg?: string
}
export interface IMenuItemSub {
  title: string,
  icon?: string,
  color?: string,
  active?: boolean,
  disabled?: boolean,
  routing?: string,
  externalLink?: string,
  layout?: string;
  sub?: IMenuItemSub[]
  enabled: boolean,
}
export interface IMenuItemBadge {
  text?: string,
  color?: string,
  bg?: string
}
