import {
  emailValidation,
  idValidation,
  experienceValidation,
  numberValidation,
  selectionValidation,
  stringValidation,
  passwordValidation,
} from '../utils';

export const labels = [
  {
    label: 'Full Name (English)',
    inputType: 'TextField',
    showInput: 'true',
    key: 'fullName',
    validator: stringValidation,
  },
  {
    label: 'Email',
    inputType: 'TextField',
    showInput: 'true',
    key: 'email',
    validator: emailValidation,
  },
  {
    label: 'ID',
    inputType: 'TextField',
    showInput: 'true',
    key: 'id',
    validator: idValidation,
  },
  {
    label: 'Password',
    inputType: 'TextField',
    type: 'password',
    showInput: 'false',
    key: 'password',
    validator: passwordValidation,
  },
  {
    label: 'Phone Number',
    inputType: 'TextField',
    showInput: 'true',
    key: 'phoneNumber',
    validator: numberValidation,
  },
  {
    label: 'Field of Study',
    inputType: 'Select',
    showInput: 'true',
    options: ['מדעי המחשב', 'מערכות מידע', 'מדעי הנתונים', 'אחר'],
    key: 'fieldOfStudy',
    validator: selectionValidation,
  },
  {
    label: 'School Year',
    inputType: 'Select',
    showInput: 'true',
    options: ['א', 'ב', 'ג', 'ד'],
    key: 'schoolYear',
    validator: selectionValidation,
  },
  {
    label: 'Program',
    inputType: 'Select',
    showInput: 'true',
    options: ['בוקר', 'ערב', 'אלצ', 'אבצ'],
    key: 'program',
    validator: selectionValidation,
  },
  {
    label: 'Experience',
    inputType: 'Select',
    showInput: 'true',
    options: ['כן', 'לא'],
    key: 'experience',
    validator: selectionValidation,
  },
  {
    label: 'Experience Details',
    inputType: 'TextField',
    showInput: 'true',
    key: 'experienceDetails',
    validator: experienceValidation,
  },
];

export const allRules = [
  'כל נהלי האגודה והמכללה חלים גם במועדון.',
  'חובה להתנהג בצורה נאותה וחברית לכל אחד מחברי המועדון. הפרה של נוהל זה תוביל להוצאה מיידית מהמועדון מבלי אופציה לחזור.',
  'העתקות במטלות (בין אם מהאינטרנט או מחברי מועדון אחרים) יגררו הוצאת חבר מועדון שהעתיק.',
  'חובה להגיע לכל המפגשים ובזמן, חבר שיעדר יותר מפעמיים ללא סיבה מוצדקת בסמסטר יצא מהמועדון.',
  'יש לפנות במקרה הצורך לראש הצוות בכל בעיה אישית/צוותית על מנת לפתור את הבעיה על הצד הטוב ביותר.',
  'אני מאשר להשתמש בתמונות\\סרטונים שצולמו במהלך המפגשים לצרכי שיווק ופרסום.',
];

export const errorMessages = {
  id: 'ID is not valid',
  experienceDetails: 'Tell us about your experience',
  experience: 'Required Field',
  program: 'Required Field',
  schoolYear: 'Required Field',
  fieldOfStudy: 'Required Field',
  phoneNumber: 'Phone number must contain 10 digits',
  email: 'Email is not valid',
  fullName: 'Must be in English! min 3 characters',
  // password: "Password must contain atleast 6 chars.",
};
