//
import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import Table from './Table';
import Drawer from './Drawer';
import Button from './Button';
import Tooltip from './Tooltip';
import Backdrop from './Backdrop';
import Typography from './Typography';
import Autocomplete from './Autocomplete';
import Alert from './Alert';
import Select from './Select';
import Menu from './Menu'
// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    Table(theme),
    Input(theme),
    Menu(theme),
    Paper(theme),
    Drawer(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    Autocomplete(theme),
    Alert(theme),
    Select(theme),
  );
}
