export default class ListItemDecorator{
   nonSelectedStyle(listItem){
      return Object.assign(listItem.divStyle, {
         'backgroundColor':'pink'
      });
   }
}
