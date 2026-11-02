with open(r'C:\Users\MyBook PRO K7\Documents\Preloved\backend\controllers\productController.js', 'r') as f:
    lines = f.readlines()

# Fix line 174 (0-indexed: 173)
if len(lines) >= 174:
    # The line currently has: "      UPDATE product SET \\\\ WHERE product_id = ?," 
    # We need to change it to: "      UPDATE product SET ${updates.join(', ')} WHERE product_id = ?,"
    old_pattern = 'UPDATE product SET  WHERE product_id = ?,'
    new_pattern = 'UPDATE product SET ${updates.join(", ")} WHERE product_id = ?,'
    
    print('Old line 174:', repr(lines[173][:60]))
    
    if old_pattern in lines[173]:
        lines[173] = lines[173].replace(old_pattern, new_pattern)
        with open(r'C:\Users\MyBook PRO K7\Documents\Preloved\backend\controllers\productController.js', 'w') as f:
            f.writelines(lines)
        print('NEW line 174:', repr(lines[173][:60]))
        print('SUCCESS: Fixed productController.js line 174')
    else:
        print('Pattern not found in line 173')
        print('Looking for:', repr(old_pattern))
        print('In line:', repr(lines[173]))