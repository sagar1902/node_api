const tasks = require('./tasksRoute');
 
test('should return all the tasks from DB', () => {
    expect(tasks.get('/')).toBe(Object);
  });